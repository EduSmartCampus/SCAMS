const mongoose = require("mongoose");


const lecturerSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		name: String,
		email: String,
		role: {
			type: String,
			default: "lecturer",
		},
		password: String,
	},
	{ _id: true }
);


module.exports = mongoose.model("Lecturer", lecturerSchema);

