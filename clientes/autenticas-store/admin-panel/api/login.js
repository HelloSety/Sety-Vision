const bcrypt = require('bcryptjs');
const { signSession, setSessionCookie } = require('./_lib/auth');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }
  try {
    const { username, password } = req.body || {};
    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedHash = process.env.ADMIN_PASSWORD_HASH;

    if (!expectedUser || !expectedHash) {
      res.status(500).json({ error: 'Admin não configurado' });
      return;
    }
    if (username !== expectedUser) {
      res.status(401).json({ error: 'Usuário ou senha inválidos' });
      return;
    }
    const valid = await bcrypt.compare(password || '', expectedHash);
    if (!valid) {
      res.status(401).json({ error: 'Usuário ou senha inválidos' });
      return;
    }

    const token = signSession(username);
    setSessionCookie(res, token);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
