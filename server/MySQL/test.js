// const db = require('./db');

// // Hàm thực hiện query tùy ý
// async function queryMysql(query, params = []) {
//   const [rows] = await db.query(query, params);
//   return rows;
// }

// // Các hàm khác vẫn giữ nguyên nếu bạn cần test riêng
// async function testConnection() {
//   try {
//     const rows = await queryMysql('SELECT * FROM students');
//     console.log('Students:', rows);
//   } catch (err) {
//     console.error('Database error:', err);
//   }
// }

// async function findStudentByName(name) {
//   try {
//     const rows = await queryMysql('SELECT * FROM students WHERE name = ?', [name]);
//     console.log('Student(s) found:', rows);
//   } catch (err) {
//     console.error('Error:', err);
//   }
// }

// async function insertStudent(id, name, email, role, password) {
//   try {
//     const result = await db.query(
//       'INSERT INTO students (id, name, email, role, password) VALUES (?, ?, ?, ?, ?)',
//       [id, name, email, role, password]
//     );
//     console.log('Student inserted, ID:', result.insertId);
//   } catch (err) {
//     console.error('Insert failed:', err);
//   }
// }

// // Nếu muốn test trực tiếp, bật dòng này
// // main();

// module.exports = {
//   queryMysql,
//   testConnection,
//   findStudentByName,
//   insertStudent
// };

const db = require("./db");

// Hàm thực hiện query tùy ý
async function queryMysql(query, params = []) {
	const [rows] = await db.query(query, params);
	return rows;
}

// Các hàm khác vẫn giữ nguyên nếu bạn cần test riêng
async function testConnection() {
	try {
		const rows = await queryMysql("SELECT * FROM students");
		console.log("Students:", rows);
	} catch (err) {
		console.error("Database error:", err);
	}
}

async function findStudentByMail(email) {
	try {
		const rows = await queryMysql("SELECT * FROM students WHERE email = ?", [
			email,
		]);
		// console.log("Student(s) found:", rows);
		return rows[0]
	} catch (err) {
		console.error("Error:", err);
	}
}

async function findLecturerByMail(email) {
	try {
		const rows = await queryMysql("SELECT * FROM lecturers WHERE email = ?", [
			email,
		]);
		// console.log("Lecturer(s) found:", rows);
		return rows[0]
	} catch (err) {
		console.error("Error:", err);
	}
}

async function findStudentByName(name) {
	try {
		const rows = await queryMysql("SELECT * FROM students WHERE name = ?", [
			name,
		]);
		console.log("Student(s) found:", rows);
	} catch (err) {
		console.error("Error:", err);
	}
}

async function insertStudent(id, name, email, role, password) {
	try {
		const result = await db.query(
			"INSERT INTO students (id, name, email, role, password) VALUES (?, ?, ?, ?, ?)",
			[id, name, email, role, password]
		);
		console.log("Student inserted, ID:", result.insertId);
	} catch (err) {
		console.error("Insert failed:", err);
	}
}

async function insertLecturer( name, email, role, password) {
	try {
		const result = await db.query(
			"INSERT INTO lecturers (name, email, role, password) VALUES ( ?, ?, ?, ?)",
			[ name, email, role, password]
		);
		console.log("Lecturer inserted, ID:", result.insertId);
	} catch (err) {
		console.error("Insert failed:", err);
	}
}

// Nếu muốn test trực tiếp, bật dòng này
// main();

module.exports = {
	queryMysql,
	testConnection,
	findStudentByName,
	insertStudent,
	insertLecturer,
	findLecturerByMail,
	findStudentByMail
};
