const mongoose = require("mongoose");

const lecturerSchema = new mongoose.Schema({
	name: String,
	email: String,
	role: {
		type: String,
		default: "lecturer",
	},
	password: String,
});

module.exports = mongoose.model("Lecturer", lecturerSchema);
