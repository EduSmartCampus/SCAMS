const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	_id: Number, // dùng student ID làm _id
	name: String,
	email: String,
	role: {
		type: String,
		default: "student",
	},
	password: String,
});

module.exports = mongoose.model("Student", studentSchema);
