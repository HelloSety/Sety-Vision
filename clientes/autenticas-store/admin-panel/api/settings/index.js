const { getDb } = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;

  const sql = getDb();

  if (req.method === 'GET') {
    try {
      const rows = await sql`select key, value from site_settings`;
      const settings = {};
      for (const row of rows) settings[row.key] = row.value;
      res.status(200).json(settings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  if (req.method === 'PUT') {
    try {
      const { key, value } = req.body || {};
      if (!key) {
        res.status(400).json({ error: 'key é obrigatório' });
        return;
      }
      await sql`
        insert into site_settings (key, value) values (${key}, ${JSON.stringify(value ?? {})}::jsonb)
        on conflict (key) do update set value = excluded.value
      `;
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
};
