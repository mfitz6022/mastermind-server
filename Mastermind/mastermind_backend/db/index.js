require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNAME,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD
});

module.exports = {
  query: (string, params) => pool.query(string, params)
}