import { put, list, del } from '@vercel/blob';
import { isAdmin } from './_auth.js';

const PREFIX = 'settings-';

const DEFAULTS = {
  banners: [
    {
      id: 'banner-1',
      desktopImage: 'hero-banner.jpg',
      mobileImage: '',
      headline: '',
      subtitle: '',
      buttonText: 'Comprar Agora',
      buttonLink: '#lancamentos',
    },
  ],
  collections: [
    { cat: 'cuecas', label: 'Cuecas', img: 'cueca-cores-1.jpg' },
    { cat: 'compressao', label: 'Compressão', img: 'camisa-preta-compressao-1.jpg' },
    { cat: 'regatas', label: 'Regatas', img: 'regata-cinza-1.jpg' },
    { cat: 'americanas', label: 'Camisas Americanas', img: 'camisa-americana-1.jpg' },
    { cat: 'camisas', label: 'Camisas', img: 'camisa-cotton-1.jpg' },
    { cat: 'antigas', label: 'Camisas Antigas', img: 'camisa-judas-1.jpg' },
  ],
  gate: {
    enabled: true,
    password: 'revolução nordestina',
    contactMethod: 'whatsapp',
  },
};

async function listSorted() {
  const { blobs } = await list({ prefix: PREFIX });
  return blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

async function readSettings() {
  const blobs = await listSorted();
  if (!blobs.length) return DEFAULTS;
  const r = await fetch(blobs[0].url, { cache: 'no-store' });
  return r.ok ? { ...DEFAULTS, ...(await r.json()) } : DEFAULTS;
}

async function writeSettings(settings) {
  const oldBlobs = await listSorted();
  await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(settings), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
  if (oldBlobs.length) await del(oldBlobs.map(b => b.url)).catch(() => {});
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const settings = await readSettings();
    return res.status(200).json(settings);
  }

  if (!isAdmin(req)) return res.status(401).json({ error: 'Não autorizado' });

  if (req.method === 'PATCH') {
    const current = await readSettings();
    const next = { ...current, ...(req.body || {}) };
    await writeSettings(next);
    return res.status(200).json(next);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
