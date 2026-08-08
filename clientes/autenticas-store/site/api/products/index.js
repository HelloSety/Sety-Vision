const { getDb } = require('../_lib/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }
  try {
    const sql = getDb();
    const rows = await sql`
      select * from products
      where active = true
      order by sort_order asc, created_at asc
    `;
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
