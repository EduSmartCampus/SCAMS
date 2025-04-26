const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
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
			default: "staff",
		},
		password: String,
		//keycard: String,
	},
	{ _id: false }
);

module.exports = mongoose.model("Staff", staffSchema);
