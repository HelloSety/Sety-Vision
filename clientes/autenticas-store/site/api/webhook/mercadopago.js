const { getDb } = require('../_lib/db');
const { getPaymentApi } = require('../_lib/mercadopago');
const { sendOrderApprovedEmail } = require('../_lib/notify');

const STATUS_MAP = {
  approved: 'approved',
  pending: 'pending',
  in_process: 'pending',
  authorized: 'pending',
  rejected: 'rejected',
  cancelled: 'cancelled',
  refunded: 'cancelled',
  charged_back: 'cancelled',
};

async function decrementStock(sql, items) {
  for (const item of items) {
    const [product] = await sql`select id, variants from products where id = ${item.product_id}`;
    if (!product) continue;

    const variants = (product.variants || []).map((v) => {
      if (v.name !== item.color) return v;
      const current = typeof v.stock === 'number' ? v.stock : null;
      if (current === null) return v;
      return { ...v, stock: Math.max(0, current - item.qty) };
    });

    await sql`update products set variants = ${JSON.stringify(variants)}::jsonb where id = ${product.id}`;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const type = req.body?.type || req.query.topic;
    const paymentId = req.body?.data?.id || req.query.id;

    if (type !== 'payment' || !paymentId) {
      res.status(200).json({ ok: true, ignored: true });
      return;
    }

    const paymentApi = getPaymentApi();
    const payment = await paymentApi.get({ id: paymentId });

    const orderId = payment.external_reference;
    if (!orderId) {
      res.status(200).json({ ok: true, ignored: true });
      return;
    }

    const sql = getDb();
    const [order] = await sql`select * from orders where id = ${orderId}`;
    if (!order) {
      res.status(200).json({ ok: true, ignored: true });
      return;
    }

    const newStatus = STATUS_MAP[payment.status] || order.status;
    const wasApproved = order.status === 'approved';

    await sql`
      update orders
      set status = ${newStatus}, mp_payment_id = ${String(payment.id)}, mp_status = ${payment.status}, mp_status_detail = ${payment.status_detail}
      where id = ${orderId}
    `;

    if (newStatus === 'approved' && !wasApproved) {
      await decrementStock(sql, order.items || []);
      try {
        await sendOrderApprovedEmail({ ...order, status: newStatus });
        await sql`update orders set notified = true where id = ${orderId}`;
      } catch (notifyErr) {
        console.error('Falha ao notificar venda aprovada:', notifyErr);
      }
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    // Sempre responde 200 pro Mercado Pago não ficar reenviando em loop por erro nosso;
    // o erro fica só no log da function pra investigação.
    console.error('Erro no webhook Mercado Pago:', err);
    res.status(200).json({ ok: false });
  }
};
