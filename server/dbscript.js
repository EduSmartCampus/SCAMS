// students
db.students.insertMany([
	{
		_id: 2252362,
		name: "Anh Khoa",
		email: "khoa.trancs2174@hcmut.edu.vn",
		role: "student",
		password: "khoanhtran",
	},
	{
		_id: 2252293,
		name: "Huynh Mai Quoc Khang",
		email: "khang.huynhmaiquoc@hcmut.edu.vn",
		role: "student",
		password: "quockhang",
	},
]);

// lecturers
db.lecturers.insertMany([
	{
		_id: ObjectId(),
		name: "Dr. Truong Tuan Anh",
		email: "tuan.anhtruong@hcmut.edu.vn",
		role: "lecturer",
		password: "tuananhtruong",
	},
	{
		_id: ObjectId(),
		name: "Nguyen Hua Phung",
		email: "phung.nguyenhua@hcmut.edu.vn",
		role: "lecturer",
		password: "phungnguyen",
	},
]);

// rooms
db.rooms.insertMany([
	{
		_id: "ROOM_B1_101",
		name: "Room B1 101",
		building: "B1",
		room_number: 101,
		capacity: 60,
		devices: ["light", "fan", "sound_system", "projector", "camera"],
		corridor_id: "CORRIDOR_B1_1",
	},
	{
		_id: "ROOM_B2_202",
		name: "Room B2 202",
		building: "B2",
		room_number: 202,
		capacity: 40,
		devices: ["light", "fan", "sound_system", "projector", "camera"],
		corridor_id: "CORRIDOR_B2_2",
	},
	{
		_id: "ROOM_A1_303",
		name: "Room A1 303",
		building: "A1",
		room_number: 303,
		capacity: 80,
		devices: ["light", "fan", "projector", "camera"],
		corridor_id: "CORRIDOR_A1_3",
	},
]);

// schedules

db.schedules.insertOne({
	_id: ObjectId(),
	room_id: "ROOM_B1_101",
	date: ISODate("2025-03-25"),
	slots: [
		{
			period: 1,
			hour: 7,
			lecture_title: "C Programming",
			booked_by: "phung.huanguyen@hcmut.edu.vn",
			lecturer_id: "GV001",
		},
		{
			period: 2,
			hour: 8,
			lecture_title: "Advanced Software Engineering",
			booked_by: "tuan.anhtruong@hcmut.edu.vn",
			lecturer_id: "GV002",
		},
		{ period: 3, hour: 9, lecture_title: "", booked_by: null },
		{ period: 4, hour: 10, lecture_title: "", booked_by: null },
		{ period: 5, hour: 11, lecture_title: "", booked_by: null },
		{ period: 6, hour: 13, lecture_title: "", booked_by: null },
		{ period: 7, hour: 14, lecture_title: "", booked_by: null },
		{ period: 8, hour: 15, lecture_title: "", booked_by: null },
		{ period: 9, hour: 16, lecture_title: "", booked_by: null },
		{ period: 10, hour: 17, lecture_title: "", booked_by: null },
		{ period: 11, hour: 18, lecture_title: "", booked_by: null },
		{ period: 12, hour: 19, lecture_title: "", booked_by: null },
	],
});
