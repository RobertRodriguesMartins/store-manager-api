const db = require('mysql2/promise');

db.config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
};

const connection = db.createPool({ ...db.config });

module.exports = connection;
