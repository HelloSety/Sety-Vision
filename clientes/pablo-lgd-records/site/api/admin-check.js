import { isAdmin } from './_auth.js';

export default async function handler(req, res) {
  return res.status(isAdmin(req) ? 200 : 401).json({ ok: isAdmin(req) });
}
