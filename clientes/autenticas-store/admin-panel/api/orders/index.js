const { getDb } = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  try {
    const sql = getDb();
    const rows = await sql`
      select * from orders order by created_at desc limit 500
    `;
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
