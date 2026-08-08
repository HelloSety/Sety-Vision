const { getDb } = require('../_lib/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }
  try {
    const { id } = req.query;
    const sql = getDb();
    const rows = await sql`
      select * from products where id = ${id} and active = true limit 1
    `;
    if (!rows.length) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
