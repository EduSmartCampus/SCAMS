const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
	_id: String, // ví dụ: "ROOM_B1_101"
	name: String,
	building: String,
	room_number: Number,
	capacity: Number,
	devices: [String],
	corridor_id: String,
});

module.exports = mongoose.model("Room", roomSchema);
