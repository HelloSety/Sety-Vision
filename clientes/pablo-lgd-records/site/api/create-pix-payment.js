export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { productId, name, price, quantity, size, color, email } = req.body || {};

  if (!name || !price || !quantity || !email) {
    res.status(400).json({ error: 'Dados incompletos (email é obrigatório para Pix)' });
    return;
  }

  const description = [name, size ? `Tam ${size}` : null, color].filter(Boolean).join(' - ');
  const amount = Number((Number(price) * Number(quantity)).toFixed(2));

  try {
    const mpRes = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'X-Idempotency-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        transaction_amount: amount,
        description,
        payment_method_id: 'pix',
        payer: { email },
        external_reference: productId,
      }),
    });

    const data = await mpRes.json();

    if (!mpRes.ok) {
      res.status(mpRes.status).json({ error: data.message || 'Erro ao gerar Pix' });
      return;
    }

    const tx = data.point_of_interaction?.transaction_data;
    if (!tx) {
      res.status(502).json({ error: 'Pix não retornado pelo Mercado Pago' });
      return;
    }

    res.status(200).json({
      paymentId: data.id,
      qrCode: tx.qr_code,
      qrCodeBase64: tx.qr_code_base64,
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar com Mercado Pago' });
  }
}
