const { neon } = require('@neondatabase/serverless');

let sql;

function getDb() {
  if (!sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL não configurada');
    sql = neon(url);
  }
  return sql;
}

module.exports = { getDb };
