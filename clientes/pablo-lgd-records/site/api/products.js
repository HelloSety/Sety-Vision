import { put, list, del } from '@vercel/blob';
import { isAdmin } from './_auth.js';

const PREFIX = 'catalog-';

async function listSorted() {
  const { blobs } = await list({ prefix: PREFIX });
  return blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

async function readCatalog() {
  const blobs = await listSorted();
  if (!blobs.length) return [];
  const r = await fetch(blobs[0].url, { cache: 'no-store' });
  return r.ok ? r.json() : [];
}

async function writeCatalog(products) {
  const oldBlobs = await listSorted();
  await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(products), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
  if (oldBlobs.length) await del(oldBlobs.map(b => b.url)).catch(() => {});
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await readCatalog();
    return res.status(200).json(products);
  }

  if (!isAdmin(req)) return res.status(401).json({ error: 'Não autorizado' });

  const products = await readCatalog();

  if (req.method === 'POST') {
    const body = req.body || {};
    if (!body.id || !body.name || !body.category || body.price == null) {
      return res.status(400).json({ error: 'Campos obrigatórios: id, name, category, price' });
    }
    if (products.some(p => p.id === body.id)) {
      return res.status(400).json({ error: 'Já existe um produto com esse ID' });
    }
    const now = new Date().toISOString();
    const newProduct = { active: true, ...body, created_at: now, updated_at: now };
    products.push(newProduct);
    await writeCatalog(products);
    return res.status(201).json(newProduct);
  }

  if (req.method === 'PATCH') {
    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'id obrigatório' });
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Produto não encontrado' });
    products[idx] = { ...products[idx], ...(req.body || {}), updated_at: new Date().toISOString() };
    await writeCatalog(products);
    return res.status(200).json(products[idx]);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'id obrigatório' });
    const next = products.filter(p => p.id !== id);
    if (next.length === products.length) return res.status(404).json({ error: 'Produto não encontrado' });
    await writeCatalog(next);
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
