const { getDb } = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;

  const sql = getDb();

  if (req.method === 'GET') {
    try {
      const rows = await sql`select * from products order by sort_order asc, created_at asc`;
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      if (!body.name || !body.category || body.price == null) {
        res.status(400).json({ error: 'name, category e price são obrigatórios' });
        return;
      }
      const id = body.id ? slugify(body.id) : slugify(body.name);
      if (!id) {
        res.status(400).json({ error: 'Não foi possível gerar um id válido para o produto' });
        return;
      }

      const [row] = await sql`
        insert into products (id, category, name, tagline, price, old_price, installment, featured, active, collections, sizes, variants, sort_order)
        values (
          ${id}, ${body.category}, ${body.name}, ${body.tagline || ''}, ${body.price}, ${body.oldPrice ?? null},
          ${body.installment || ''}, ${!!body.featured}, ${body.active !== false},
          ${body.collections || []}, ${body.sizes || []}, ${JSON.stringify(body.variants || [])}::jsonb, ${body.sortOrder ?? 0}
        )
        returning *
      `;
      res.status(201).json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
};
