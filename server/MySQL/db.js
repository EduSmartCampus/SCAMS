const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'mysqlscamsdb.mysql.database.azure.com', // your Azure MySQL server
  user: 'mysqlbackup',              // your full username with @servername
  password: 'scams@1234',            // your admin password
  database: 'university_db',                // optional: or leave empty if you haven't created DB yet
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
});
connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
  } else {
    console.log('✅ Database connected successfully.');
  }
});
module.exports = connection.promise();
