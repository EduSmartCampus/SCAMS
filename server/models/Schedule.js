const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		room_id: {
			type: String,
			required: true,
			ref: 'Room'
		},
		date: {
			type: Date,
			required: true,
		},
		usedDate: {
			type: Date,
			required: true,
		},
		startPeriod: {
			type: Number,
			required: true,
		},
		endPeriod: {
			type: Number,
			required: true,
		},
		teacherId: {
			type: Number,
			required: true
		},
		lectureTitle: {
			type: String,
			required: true,
		},
	},
	{ _id: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
