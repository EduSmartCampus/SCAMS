// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample route
app.get("/", (req, res) => {
	res.send("SCAMS Backend is running!");
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
const Room = require("./models/Room");

app.get("/api/rooms", async (req, res) => {
	try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (err) {
		res.status(500).json({ error: "Lỗi lấy danh sách phòng" });
	}
});
