// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const redis = require("./redisClient");

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
} = require("./controllers/auth.controller");

//import auth middleware
const { authMiddleware } = require("./middlewares/auth.middleware");

//import model
const Room = require("./models/Room");

//import routes
const roomRoutes = require("./routes/room.routes");
const studentRoutes = require("./routes/student.routes");
const lecturerRoutes = require("./routes/lecturer.routes");
const scheduleRoutes = require("./routes/schedule.routes");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => console.error("❌ MongoDB connection error:", err));

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

app.post("/resetPassword", resetPassword);

// app.use('/room', roomRoutes);
// vì 3 endpoint còn lại đều là dạng /room/... nên tui gộp lại
// và phần endpoint còn lại mng vô routes/room.routes.js viết
app.use("/api/rooms", roomRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/lecturers", lecturerRoutes);
// app.use("/api/schedules", scheduleRoutes);

app.get("/api/rooms", async (req, res) => {
	try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (err) {
		res.status(500).json({ error: "Lỗi lấy danh sách phòng" });
	}
});
