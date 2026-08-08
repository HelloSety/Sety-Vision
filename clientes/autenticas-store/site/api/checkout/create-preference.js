const { getDb } = require('../_lib/db');
const { getPreferenceApi } = require('../_lib/mercadopago');

function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${req.headers.host}`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  try {
    const { items, customer, shipping } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Carrinho vazio' });
      return;
    }
    const customerName = customer?.name || 'Cliente Autênticas Store';
    const customerPhone = customer?.phone || '';

    const sql = getDb();

    // Recalcula preços a partir do banco — nunca confia no preço vindo do cliente.
    const ids = [...new Set(items.map((i) => i.id))];
    const products = await sql`select id, name, price, active from products where id = any(${ids})`;

    const orderItems = [];
    for (const item of items) {
      const product = products.find((p) => p.id === item.id);
      if (!product || !product.active) {
        res.status(400).json({ error: `Produto indisponível: ${item.id}` });
        return;
      }
      const qty = Math.max(1, Number(item.qty) || 1);
      orderItems.push({
        product_id: product.id,
        name: product.name,
        color: item.color || '',
        size: item.size || '',
        price: Number(product.price),
        qty,
      });
    }

    const total = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingAddress = shipping || {};

    const [order] = await sql`
      insert into orders (status, customer_name, customer_phone, customer_email, shipping_address, items, total)
      values ('pending', ${customerName}, ${customerPhone}, ${customer?.email || null}, ${JSON.stringify(shippingAddress)}::jsonb, ${JSON.stringify(orderItems)}::jsonb, ${total})
      returning id
    `;

    const base = siteUrl(req);
    const preferenceApi = getPreferenceApi();
    const preference = await preferenceApi.create({
      body: {
        items: orderItems.map((i) => ({
          id: i.product_id,
          title: `${i.name}${i.color ? ` — ${i.color}` : ''}${i.size ? ` (Tam. ${i.size})` : ''}`,
          quantity: i.qty,
          unit_price: i.price,
          currency_id: 'BRL',
        })),
        payer: {
          name: customerName,
          email: customer?.email || undefined,
          phone: customerPhone ? { number: customerPhone } : undefined,
        },
        payment_methods: {
          excluded_payment_types: [{ id: 'ticket' }, { id: 'debit_card' }],
          excluded_payment_methods: [{ id: 'caixa' }, { id: 'debcaixa' }],
        },
        external_reference: order.id,
        back_urls: {
          success: `${base}/retorno.html?status=approved`,
          pending: `${base}/retorno.html?status=pending`,
          failure: `${base}/retorno.html?status=failure`,
        },
        auto_return: 'approved',
        notification_url: `${base}/api/webhook/mercadopago`,
        statement_descriptor: 'AUTENTICAS STORE',
      },
    });

    await sql`update orders set mp_preference_id = ${preference.id} where id = ${order.id}`;

    res.status(200).json({
      orderId: order.id,
      preferenceId: preference.id,
      initPoint: preference.init_point,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
