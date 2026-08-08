const { put } = require('@vercel/blob');
const { requireAdmin } = require('./_lib/auth');

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  try {
    const { filename, dataBase64, contentType } = req.body || {};
    if (!filename || !dataBase64 || !contentType) {
      res.status(400).json({ error: 'filename, dataBase64 e contentType são obrigatórios' });
      return;
    }

    const buffer = Buffer.from(dataBase64, 'base64');
    const ext = (filename.split('.').pop() || 'jpg').toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(path, buffer, { access: 'public', contentType });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
