import { put } from '@vercel/blob';
import { isAdmin } from './_auth.js';

export const config = {
  api: { bodyParser: { sizeLimit: '8mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!isAdmin(req)) return res.status(401).json({ error: 'Não autorizado' });

  const { dataUrl, filename } = req.body || {};
  if (!dataUrl) return res.status(400).json({ error: 'dataUrl obrigatório' });

  const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl);
  if (!match) return res.status(400).json({ error: 'Formato de imagem inválido' });

  const [, contentType, base64] = match;
  const buffer = Buffer.from(base64, 'base64');
  if (buffer.length > 6 * 1024 * 1024) return res.status(400).json({ error: 'Imagem muito grande (máx 6MB)' });

  const ext = contentType.split('/')[1] || 'jpg';
  const safeName = (filename || 'img').replace(/\.[^.]+$/, '').replace(/[^a-z0-9-]/gi, '-').toLowerCase().slice(0, 40);
  const pathname = `images/${safeName}-${Date.now()}.${ext}`;

  const blob = await put(pathname, buffer, { access: 'public', contentType, addRandomSuffix: false });
  return res.status(200).json({ url: blob.url });
}
