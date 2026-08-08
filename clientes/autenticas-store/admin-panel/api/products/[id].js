const { getDb } = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;

  const { id } = req.query;
  const sql = getDb();

  if (req.method === 'PUT') {
    try {
      const body = req.body || {};
      const [existing] = await sql`select * from products where id = ${id}`;
      if (!existing) {
        res.status(404).json({ error: 'Produto não encontrado' });
        return;
      }

      const merged = {
        category: body.category ?? existing.category,
        name: body.name ?? existing.name,
        tagline: body.tagline ?? existing.tagline,
        price: body.price ?? existing.price,
        old_price: body.oldPrice !== undefined ? body.oldPrice : existing.old_price,
        installment: body.installment ?? existing.installment,
        featured: body.featured !== undefined ? !!body.featured : existing.featured,
        active: body.active !== undefined ? !!body.active : existing.active,
        collections: body.collections ?? existing.collections,
        sizes: body.sizes ?? existing.sizes,
        variants: body.variants ?? existing.variants,
        sort_order: body.sortOrder !== undefined ? body.sortOrder : existing.sort_order,
      };

      const [row] = await sql`
        update products set
          category = ${merged.category}, name = ${merged.name}, tagline = ${merged.tagline},
          price = ${merged.price}, old_price = ${merged.old_price}, installment = ${merged.installment},
          featured = ${merged.featured}, active = ${merged.active}, collections = ${merged.collections},
          sizes = ${merged.sizes}, variants = ${JSON.stringify(merged.variants)}::jsonb, sort_order = ${merged.sort_order}
        where id = ${id}
        returning *
      `;
      res.status(200).json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      await sql`delete from products where id = ${id}`;
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    return;
  }

  res.status(405).json({ error: 'Método não permitido' });
};
