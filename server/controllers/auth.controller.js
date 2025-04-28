const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Lecturer = require("../models/Lecturer");
const User = require("../models/User");
const {
	queryMysql,
	insertStudent,
	insertLecturer,
	findLecturerByMail,
	findStudentByMail,
} = require("../MySQL/test");
const useBackupDB = require("../global");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

const redis = require("../redisClient");

const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.AES_SECRET; // Store this securely
const iv = process.env.AES_IV; // Initialization vector

// Encrypt function
function encrypt(text) {
	const cipher = crypto.createCipheriv(
		algorithm,
		Buffer.from(secretKey, "hex"),
		Buffer.from(iv, "hex")
	);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
}

// Decrypt function
function decrypt(encryptedData) {
	const decipher = crypto.createDecipheriv(
		algorithm,
		Buffer.from(secretKey, "hex"),
		Buffer.from(iv, "hex")
	);
	let decrypted = decipher.update(encryptedData, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}

async function saveOTPToRedis(userId, otp) {
	const expiresIn = 10 * 60; // 10 phút
	await redis.set(userId, otp, "EX", expiresIn); // Lưu OTP với thời gian hết hạn
}

async function validateOTPFromRedis(userId, inputOTP) {
	const storedOTP = await redis.get(userId); // Lấy OTP từ Redis

	if (!storedOTP) {
		return { success: false, message: "OTP not found or expired." };
	}

	if (storedOTP == inputOTP) {
		return { success: true, message: "OTP is valid." };
	} else {
		return { success: false, message: "Invalid OTP." };
	}
}

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000); // Mã OTP 6 chữ số
}

// Hàm gửi email với mã OTP
async function sendOTPEmail(email, otp) {
	const transporter = nodemailer.createTransport({
		host: "smtp-relay.brevo.com",
		port: 587,
		secure: false, // true for port 465, false for 587
		auth: {
			user: "8a4cfe003@smtp-brevo.com", // your Brevo login (SMTP login)
			pass: process.env.SMTP_PASSWORD, // your SMTP password
		},
	});

	const mailOptions = {
		from: "nhil31032@gmail.com",
		to: email, // replace with your actual recipient
		subject: "Your OTP Code",
		text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.error("❌ Failed to send email:", error);
		}
		console.log("✅ Email sent successfully:", info.response);
	});
}

const login = async (req, res) => {
	try {
		const { email, type, password = "", forget = 0 } = req.body;

		let user = undefined;
		let id = undefined;
		const encryptedEmail = encrypt(email);

		if (useBackupDB.useBackupDB == false) {
			const UserModel = type === "lecturer" ? Lecturer : User;

			user = await UserModel.findOne({ email: encryptedEmail });

			id = user.id;
		} else {
			user =
				type == "lecturer"
					? findLecturerByMail(encryptedEmail)
					: findStudentByMail(encryptedEmail);

			id = user.id;
		}

		if (!user) return res.status(401).json({ message: "User not found" });

		const decryptedName = decrypt(user.name);

		if (forget == 0) {
			const isPasswordCorrect = bcrypt.compareSync(password, user.password);
			if (!isPasswordCorrect)
				return res.status(401).json({ message: "Wrong password" });
		}

		const otp = generateOTP(); // Tạo mã OTP
		console.log(`Generated OTP: ${otp}`);
		sendOTPEmail(email, otp); // Gửi email với mã OTP

		saveOTPToRedis(email, otp);

		res.json({ name: decryptedName, type, id });
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const changePassword = async (req, res) => {
	try {
		const { email, oldPassword, newPassword, type } = req.body;

		const encryptedEmail = encrypt(email);

		const UserModel = type === "lecturer" ? Lecturer : User;
		const user = await UserModel.findOne({ email: encryptedEmail });

		if (!user) return res.status(404).json({ message: "User not found" });

		const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "Incorrect old password" });
		}

		const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
		user.password = hashedNewPassword;
		await user.save();

		const table = type === "lecturer" ? "lecturers" : "students";

		const result = await queryMysql(
			`UPDATE ${table} SET password = ? WHERE email = ?`,
			[hashedNewPassword, encryptedEmail]
		);
		if (result.affectedRows === 0) {
			console.log("No user found with that email.");
			return { success: false, message: "User not found" };
		}

		// const table = type === "lecturer" ? "lecturers" : "students";

		// const result = await queryMysql(
		// 	`UPDATE ${table} SET password = ? WHERE email = ?`,
		// 	[hashedNewPassword, encryptedEmail]
		// );
		// if (result.affectedRows === 0) {
		// 	console.log("No user found with that email.");
		// 	return { success: false, message: "User not found" };
		// }

		res.json({ message: "Password changed successfully" });
	} catch (err) {
		console.error("Change password error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const signup = async (req, res) => {
	try {
		const { name, email, password, type, id = 0 } = req.body;
		const UserModel = type === "lecturer" ? Lecturer : User;

		const encryptedEmail = encrypt(email);

		const existingUser = await UserModel.findOne({ email: encryptedEmail });
		if (existingUser) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const hashedPassword = bcrypt.hashSync(password, 10);
		const encryptedName = encrypt(name);
		// const encryptedEmail = encrypt(email);
		const idLecturer= Math.floor(Math.random() * 900000) + 100000

		const newUser =
			type == "lecturer"
				? new Lecturer({
						id: idLecturer,
						name: encryptedName,
						email: encryptedEmail,
						password: hashedPassword,
						role: type,
				  })
				: new User({
						id,
						name: encryptedName,
						email: encryptedEmail,
						password: hashedPassword,
						role: type,
				  });

		await newUser.save();

		type == "lecturer"
			? insertLecturer(
					idLecturer,
					encryptedName,
					encryptedEmail,
					"lecturer",
					hashedPassword
			  )
			: insertStudent(
					id,
					encryptedName,
					encryptedEmail,
					"student",
					hashedPassword
			  );

		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		console.error("Register error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const OTPCheck = async (req, res) => {
	const { email, otp, type, id } = req.body;
	const result = await validateOTPFromRedis(email, otp);

	if (result.success == true) {
		const token = jwt.sign({ email, type, id }, SECRET_KEY, {
			expiresIn: "1h",
		});
		res.json({ token });
	} else {
		res.json({ message: result.message });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { email, newPassword, type } = req.body;
		const encryptedEmail = encrypt(email);
		const UserModel = type === "lecturer" ? Lecturer : User;

		const existingUser = await UserModel.findOne({ email: encryptedEmail });
		if (!existingUser) {
			return res.status(400).json({ message: "Email does not exist" });
		}

		const hashedPassword = bcrypt.hashSync(newPassword, 10);

		await UserModel.updateOne(
			{ email: encryptedEmail }, // điều kiện
			{ $set: { password: hashedPassword } }
		);

		const table = type === "lecturer" ? "lecturers" : "students";

		const result = await queryMysql(
			`UPDATE ${table} SET password = ? WHERE email = ?`,
			[hashedPassword, encryptedEmail]
		);
		if (result.affectedRows === 0) {
			console.log("No user found with that email.");
			return { success: false, message: "User not found" };
		}

		res.status(201).json({ message: "User reset password successfully" });
	} catch (err) {
		console.error("Reset Password error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	changePassword,
	login,
	signup,
	sendOTPEmail,
	generateOTP,
	OTPCheck,
	resetPassword,
};
