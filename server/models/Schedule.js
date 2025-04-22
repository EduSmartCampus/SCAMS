const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
	room_id: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	// Tạo các slots riêng biệt cho từng period trong một ngày
	period_1: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_2: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_3: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_4: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_5: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_6: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_7: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_8: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_9: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_10: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_11: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
	period_12: {
		hour: Number,
		lecture_title: String,
		booked_by: String,
	},
});

module.exports = mongoose.model("Schedule", scheduleSchema);
