const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '35.220.128.237', // from Google Cloud SQL instance
  user: 'root',
  password: 'kr(uX3]cQRvBdO,D',
  database: 'university_db',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
