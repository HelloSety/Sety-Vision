const jwt = require('jsonwebtoken');

const COOKIE_NAME = 'as_admin_session';
const SESSION_HOURS = 12;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET não configurada');
  return secret;
}

function signSession(username) {
  return jwt.sign({ sub: username, role: 'admin' }, getSecret(), { expiresIn: `${SESSION_HOURS}h` });
}

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((c) => {
      const idx = c.indexOf('=');
      return [c.slice(0, idx).trim(), decodeURIComponent(c.slice(idx + 1).trim())];
    })
  );
}

function setSessionCookie(res, token) {
  const maxAge = SESSION_HOURS * 60 * 60;
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`
  );
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
}

function requireAdmin(req, res) {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  if (!token) {
    res.status(401).json({ error: 'Não autenticado' });
    return null;
  }
  try {
    return jwt.verify(token, getSecret());
  } catch {
    res.status(401).json({ error: 'Sessão inválida ou expirada' });
    return null;
  }
}

module.exports = { signSession, setSessionCookie, clearSessionCookie, requireAdmin };
