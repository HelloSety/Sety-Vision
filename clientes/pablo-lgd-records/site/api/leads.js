import { put, list, del } from '@vercel/blob';
import { isAdmin } from './_auth.js';

const PREFIX = 'leads-';

async function listSorted() {
  const { blobs } = await list({ prefix: PREFIX });
  return blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

async function readLeads() {
  const blobs = await listSorted();
  if (!blobs.length) return [];
  const r = await fetch(blobs[0].url, { cache: 'no-store' });
  return r.ok ? r.json() : [];
}

async function writeLeads(leads) {
  const oldBlobs = await listSorted();
  await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(leads), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
  if (oldBlobs.length) await del(oldBlobs.map(b => b.url)).catch(() => {});
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { whatsapp, email, productId, source } = req.body || {};
    if (!whatsapp && !email) return res.status(400).json({ error: 'whatsapp ou email obrigatório' });
    const leads = await readLeads();
    leads.unshift({
      id: crypto.randomUUID(),
      whatsapp: whatsapp || null,
      email: email || null,
      product_id: productId || null,
      source: source || 'site',
      status: 'novo',
      created_at: new Date().toISOString(),
    });
    await writeLeads(leads);
    return res.status(201).json({ ok: true });
  }

  if (!isAdmin(req)) return res.status(401).json({ error: 'Não autorizado' });

  if (req.method === 'GET') {
    const leads = await readLeads();
    return res.status(200).json(leads);
  }

  if (req.method === 'PATCH') {
    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'id obrigatório' });
    const leads = await readLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Lead não encontrado' });
    leads[idx] = { ...leads[idx], ...(req.body || {}) };
    await writeLeads(leads);
    return res.status(200).json(leads[idx]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
