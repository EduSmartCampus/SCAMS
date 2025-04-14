// db.js
const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: 'localhost',      // or your database server
  user: 'root',           // your MySQL username
  password: '0123456789',           // your MySQL password
  database: 'university_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: convert to promise-based API
const promisePool = pool.promise();

module.exports = promisePool;