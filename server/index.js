// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const redis = require("./redisClient");
const { queryMysql } = require("./MySQL/test");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET;

//used controllers
const {
	login,
	changePassword,
	signup,
	OTPCheck,
	resetPassword,
} = require("./controllers/auth.controller");

//import auth middleware
const { authMiddleware } = require("./middlewares/auth.middleware");

//import model
const Room = require("./models/Room");

//import routes
const roomRoutes = require("./routes/room.routes");
// const studentRoutes = require("./routes/student.routes");
// const lecturerRoutes = require("./routes/lecturer.routes");
// const scheduleRoutes = require("./routes/schedule.routes");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

(async () => {
	try {
		const result = await queryMysql("SELECT * FROM rooms");
		console.log("✅ MySQL test query OK:", result.length, "rows");
	} catch (err) {
		console.error("❌ MySQL test query FAILED:", err.message);
	}
})();

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
	console.log(`View API docs at http://localhost:${PORT}/api-docs`);
});

// Route Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test
redis.get("greeting").then((result) => {
	console.log("Redis test:", result);
});

// Sample route
app.get("/", (req, res) => {
	res.send("SCAMS Backend is running!");
});

app.post("/login", login);

app.post("/signup", signup);

app.post("/changePassword", authMiddleware, changePassword);

app.post("/checkOTP", OTPCheck);

app.post("/resetPassword", authMiddleware, resetPassword);

app.use("/room", roomRoutes);
// vì 3 endpoint còn lại đều là dạng /room/... nên tui gộp lại
// và phần endpoint còn lại mng vô routes/room.routes.js viết
//app.use("/rooms", roomRoutes);

// app.use("/api/students", studentRoutes);
// app.use("/api/lecturers", lecturerRoutes);
// app.use("/api/schedules", scheduleRoutes);

// MySQL-only GET route
app.get("/rooms", async (req, res) => {
	try {
		const mysqlRooms = await queryMysql("SELECT * FROM rooms");
		res.json(mysqlRooms);
	} catch (mysqlErr) {
		console.error("MySQL lỗi:", mysqlErr.message);
		res.status(500).send("Lỗi khi lấy dữ liệu từ MySQL");
	}
});

// app.get("/rooms", async (req, res) => {
// 	// MongoDB query
// 	const mongoPromise = Room.find();

// 	// Timeout 2 giây để coi là quá tải
// 	const timeout = new Promise((_, reject) =>
// 		setTimeout(() => reject(new Error("MongoDB timeout")), 2000)
// 	);

// 	try {
// 		// Nếu MongoDB phản hồi trong 2s dùng luôn
// 		const rooms = await Promise.race([mongoPromise, timeout]);
// 		return res.json(rooms);
// 	} catch (err) {
// 		console.warn("MongoDB bị lỗi hoặc chậm chuyển sang MySQL");

// 		try {
// 			const mysqlRooms = await queryMysql("SELECT * FROM rooms");
// 			return res.json(mysqlRooms);
// 		} catch (mysqlErr) {
// 			console.error("MySQL cũng lỗi:", mysqlErr.message);
// 			return res.status(500).send("Lỗi cả MongoDB lẫn MySQL");
// 		}
// 	}
// });
