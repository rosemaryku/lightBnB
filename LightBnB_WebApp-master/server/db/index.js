const { Pool } = require('pg');
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  port: 5432,
  database: "lightbnb",
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}