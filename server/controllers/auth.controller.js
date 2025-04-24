const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Staff = require("../models/Staff");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

const redis = require("../redisClient");

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
	// Cấu hình gửi email
	// const transporter = nodemailer.createTransport({
	//   service: 'gmail',  // Sử dụng Gmail hoặc thay bằng SMTP khác
	//   auth: {
	// 	user: 't.dat232000@gmail.com',  // Thay bằng email của bạn
	// 	pass: 'tdat232000@@',  // Thay bằng mật khẩu email của bạn hoặc app password
	//   }
	// });

	// // Nội dung email
	// const mailOptions = {
	//   from: 't.dat232000@gmail.com',
	//   to: email,
	//   subject: 'Your OTP Code',
	//   text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`  // Nội dung email
	// };

	// // Gửi email
	// try {
	//   const info = await transporter.sendMail(mailOptions);
	//   console.log('Email sent: ' + info.response);
	// } catch (error) {
	//   console.error('Error sending email: ', error);
	// }

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
		const { email, password, type } = req.body;
		const UserModel = type === "lecturer" ? Lecturer : Student;

		const user = await UserModel.findOne({ email });
		if (!user) return res.status(401).json({ message: "User not found" });

		const isPasswordCorrect = bcrypt.compareSync(password, user.password);
		if (!isPasswordCorrect)
			return res.status(401).json({ message: "Wrong password" });

		const otp = generateOTP(); // Tạo mã OTP
		console.log(`Generated OTP: ${otp}`);
		sendOTPEmail(email, otp); // Gửi email với mã OTP

		saveOTPToRedis(email, otp);

		res.json({ name: user.name });
	} catch (err) {
		console.error("Login error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const changePassword = async (req, res) => {
	try {
		const { email, oldPassword, newPassword, type } = req.body;

		const UserModel = type === "lecturer" ? Lecturer : Student;
		const user = await UserModel.findOne({ email });

		if (!user) return res.status(404).json({ message: "User not found" });

		const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "Incorrect old password" });
		}

		const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
		user.password = hashedNewPassword;
		await user.save();

		res.json({ message: "Password changed successfully" });
	} catch (err) {
		console.error("Change password error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const signup = async (req, res) => {
	try {
		const { name, email, password, type, id = 0 } = req.body;
		const UserModel = type === "lecturer" ? Lecturer : Student;

		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const hashedPassword = bcrypt.hashSync(password, 10);

		const newUser =
			type == "lecturer"
				? new Lecturer({
						name,
						email,
						password: hashedPassword,
						role: "lecturer",
				  })
				: new Student({
						_id: id,
						name,
						email,
						password: hashedPassword,
						role: "student",
				  });

		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		console.error("Register error:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

const OTPCheck = async (req, res) => {
	const { email, otp } = req.body;
	const result = await validateOTPFromRedis(email, otp);

	if (result.success == true) {
		const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
		res.json({ token });
	} else {
		res.json({ message: result.message });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { email, newPassword, type } = req.body;
		const UserModel = type === "lecturer" ? Lecturer : Student;

		const existingUser = await UserModel.findOne({ email });
		if (!existingUser) {
			return res.status(400).json({ message: "Email does not exist" });
		}

		const hashedPassword = bcrypt.hashSync(newPassword, 10);

		await UserModel.updateOne(
			{ email }, // điều kiện
			{ $set: { password: hashedPassword } }
		);

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
