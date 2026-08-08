const { requireAdmin } = require('./_lib/auth');

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  res.status(200).json({ username: session.sub });
};
