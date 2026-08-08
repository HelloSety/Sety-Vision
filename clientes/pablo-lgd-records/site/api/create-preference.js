export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { productId, name, price, quantity, size, color } = req.body || {};

  if (!name || !price || !quantity) {
    res.status(400).json({ error: 'Dados do produto incompletos' });
    return;
  }

  const origin = `https://${req.headers.host}`;
  const title = [name, size ? `Tam ${size}` : null, color].filter(Boolean).join(' - ');

  try {
    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        items: [{
          id: productId,
          title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: 'BRL',
        }],
        back_urls: {
          success: `${origin}/shop.html?pago=1`,
          failure: `${origin}/produto.html?id=${productId}&erro=1`,
          pending: `${origin}/shop.html?pago=1`,
        },
        auto_return: 'approved',
        external_reference: productId,
        statement_descriptor: 'LGD RECORDS',
      }),
    });

    const data = await mpRes.json();

    if (!mpRes.ok) {
      res.status(mpRes.status).json({ error: data.message || 'Erro ao criar preferência' });
      return;
    }

    res.status(200).json({ init_point: data.init_point });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar com Mercado Pago' });
  }
}
