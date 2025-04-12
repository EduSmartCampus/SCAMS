const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
	room_id: String,
	date: Date,
	slots: [
		{
			period: Number,
			hour: Number,
			lecture_title: String,
			booked_by: String,
			lecturer_id: String,
		},
	],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
