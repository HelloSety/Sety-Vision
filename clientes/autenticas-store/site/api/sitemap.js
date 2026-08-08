const { getDb } = require('./_lib/db');

const BASE = 'https://autenticasstore.com.br';

module.exports = async (req, res) => {
  try {
    const sql = getDb();
    const products = await sql`select id, updated_at from products where active = true`;

    const urls = [
      { loc: `${BASE}/`, priority: '1.0' },
      ...products.map((p) => ({
        loc: `${BASE}/produto.html?id=${p.id}`,
        lastmod: p.updated_at,
        priority: '0.8',
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send(`<?xml version="1.0"?><error>${err.message}</error>`);
  }
};
