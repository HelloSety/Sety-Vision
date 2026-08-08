const { requireAdmin } = require('../../_lib/auth');

function mapStatus(mpStatus) {
  if (mpStatus === 'approved') return 'approved';
  if (['pending', 'in_process', 'authorized'].includes(mpStatus)) return 'pending';
  return 'rejected'; // rejected, cancelled, refunded, charged_back
}

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  try {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) throw new Error('MP_ACCESS_TOKEN não configurada');

    const url = 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&limit=100';
    const mpRes = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await mpRes.json();
    if (!mpRes.ok) throw new Error(data.message || 'Erro ao consultar o Mercado Pago');

    // Esta conta do Mercado Pago pode ter histórico de outros negócios/lojas do cliente/agência.
    // Só listamos aqui os pagamentos que passaram pelo checkout da Autênticas Store
    // (identificados pelo metadata que create-preference.js sempre envia).
    const orders = (data.results || [])
      .filter((p) => p.metadata?.customer_name)
      .map((p) => ({
        id: p.id,
        created_at: p.date_created,
        customer_name: p.metadata.customer_name,
        customer_phone: p.metadata?.customer_phone || '',
        items: (p.additional_info?.items || []).map((i) => ({
          name: i.title,
          qty: Number(i.quantity) || 1,
          color: '',
        })),
        total: p.transaction_amount,
        status: mapStatus(p.status),
        mp_status: `${p.status}${p.status_detail ? ` (${p.status_detail})` : ''}`,
      }));

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
