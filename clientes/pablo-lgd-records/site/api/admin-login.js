import { sign } from './_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body || {};
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  const expiry = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 dias
  const token = `${expiry}.${sign(expiry)}`;
  res.setHeader('Set-Cookie', `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`);
  return res.status(200).json({ ok: true });
}
