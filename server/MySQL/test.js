const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT * FROM students');
    console.log('Students:', rows);
  } catch (err) {
    console.error('Database error:', err);
  }
}

async function findStudentByName(name) {
  try {
    const [rows] = await db.query(
      'SELECT * FROM students WHERE name = ?',
      [name]
    );

    if (rows.length === 0) {
      console.log(`No student found with name: ${name}`);
    } else {
      console.log('Student(s) found:', rows);
    }
  } catch (error) {
    console.error('Error querying student by name:', error);
  }
}

async function insertStudent(id, name, email, role, password) {
  try {
    const [result] = await db.query(
      'INSERT INTO students (id, name, email, role, password) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, role, password]
    );

    console.log('Student inserted successfully. Insert ID:', result.insertId);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('Error: Duplicate ID or email.');
    } else {
      console.error('Insert failed:', error);
    }
  }
}

async function main() {
  await testConnection();
  await findStudentByName('Anh Khoa');
  await findStudentByName('Minh Tuan');
  await insertStudent(
    2252388,
    'Minh Tuan',
    'a.nguyenvan@hcmut.edu.vn',
    'student',
    'securepassword123'
  );
  await findStudentByName('Minh Tuan');
}

main();
