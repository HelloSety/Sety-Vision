export default async function handler(req, res) {
  const { id } = req.query || {};
  if (!id) {
    res.status(400).json({ error: 'id obrigatório' });
    return;
  }

  try {
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    });
    const data = await mpRes.json();

    if (!mpRes.ok) {
      res.status(mpRes.status).json({ error: data.message || 'Erro ao consultar pagamento' });
      return;
    }

    res.status(200).json({ status: data.status });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar com Mercado Pago' });
  }
}
