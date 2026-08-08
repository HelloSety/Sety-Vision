const { getDb } = require('./_lib/db');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }
  try {
    const sql = getDb();
    const rows = await sql`select key, value from site_settings`;
    const settings = {};
    for (const row of rows) settings[row.key] = row.value;
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
