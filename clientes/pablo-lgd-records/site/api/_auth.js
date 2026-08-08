import crypto from 'node:crypto';

export function isAdmin(req) {
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/admin_session=([^;]+)/);
  if (!match) return false;
  const [expiry, sig] = decodeURIComponent(match[1]).split('.');
  if (!expiry || !sig) return false;
  if (Date.now() > Number(expiry)) return false;
  const expected = crypto.createHmac('sha256', process.env.ADMIN_PASSWORD).update(expiry).digest('hex');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expBuf);
}

export function sign(expiry) {
  return crypto.createHmac('sha256', process.env.ADMIN_PASSWORD).update(String(expiry)).digest('hex');
}
