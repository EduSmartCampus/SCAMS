const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["staff", "student"],
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ _id: true }
);

module.exports = mongoose.model("User", userSchema);
