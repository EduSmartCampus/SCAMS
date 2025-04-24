// staffs
db.staffs.insertMany([
	{
		id: 101,
		name: "Nguyen Thi Lan",
		email: "nguyen.thilan@hcmut.edu.vn",
		role: "staff",
		password: "nguyenlan123",
		keycard: "KEY001",
	},
	{
		id: 102,
		name: "Tran Thi Bao",
		email: "tran.thibao@hcmut.edu.vn",
		role: "staff",
		password: "tranbao123",
		keycard: "KEY002",
	},
	{
		id: 103,
		name: "Le Minh Duc",
		email: "le.minhduc@hcmut.edu.vn",
		role: "staff",
		password: "leduc123",
		keycard: "KEY003",
	},
	{
		id: 104,
		name: "Pham Thi Thu",
		email: "pham.thithu@hcmut.edu.vn",
		role: "staff",
		password: "phamthu123",
		keycard: "KEY004",
	},
]);

// users
db.users.insertMany([
	{
		id: 1,
		name: "Dr. Truong Tuan Anh",
		email: "tuan.anhtruong@hcmut.edu.vn",
		role: "lecturer",
		password: "tuananhtruong",
	},
	{
		id: 2,
		name: "Nguyen Hua Phung",
		email: "phung.nguyenhua@hcmut.edu.vn",
		role: "lecturer",
		password: "phungnguyen",
	},
	{
		id: 3,
		name: "Pham Tien Thanh",
		email: "pham.tienthanh@hcmut.edu.vn",
		role: "lecturer",
		password: "pham.tienthanh",
	},
	{
		id: 4,
		name: "Nguyen Le Hoa",
		email: "nguyen.lehoa@hcmut.edu.vn",
		role: "lecturer",
		password: "nguyen.lehoa",
	},
	{
		id: 5,
		name: "Tran Hai Anh",
		email: "tran.haianh@hcmut.edu.vn",
		role: "lecturer",
		password: "tran.haianh",
	},
	{
		id: 6,
		name: "Le Vudat",
		email: "le.vudat@hcmut.edu.vn",
		role: "lecturer",
		password: "le.vudat",
	},
	{
		id: 7,
		name: "Nguyen Minh Quang",
		email: "nguyen.minhquang@hcmut.edu.vn",
		role: "lecturer",
		password: "nguyen.minhquang",
	},
	{
		id: 8,
		name: "Pham Ngoc Thanh",
		email: "pham.ngocthanh@hcmut.edu.vn",
		role: "lecturer",
		password: "pham.ngocthanh",
	},
	{
		id: 9,
		name: "Tran Tien Khoa",
		email: "tran.tienkhoa@hcmut.edu.vn",
		role: "lecturer",
		password: "tran.tienkhoa",
	},
	{
		id: 10,
		name: "Le Duc Thanh",
		email: "le.ducthanh@hcmut.edu.vn",
		role: "lecturer",
		password: "le.ducthanh",
	},
	{
		id: 11,
		name: "Nguyen Bich Tram",
		email: "nguyen.bichtram@hcmut.edu.vn",
		role: "lecturer",
		password: "nguyen.bichtram",
	},
	{
		id: 12,
		name: "Pham Nguyet Anh",
		email: "pham.nguyetanh@hcmut.edu.vn",
		role: "lecturer",
		password: "pham.nguyetanh",
	},
	{
		id: 13,
		name: "Do Hoang Tu",
		email: "do.hoangtu@hcmut.edu.vn",
		role: "lecturer",
		password: "do.hoangtu",
	},
	{
		id: 14,
		name: "Nguyen Van Nam",
		email: "nguyen.vannam@hcmut.edu.vn",
		role: "lecturer",
		password: "nguyen.vannam",
	},
]);

db.users.insertMany([
	{
		id: 2252362,
		name: "Anh Khoa",
		email: "khoa.trancs2174@hcmut.edu.vn",
		role: "student",
		password: "khoanhtran",
	},
	{
		id: 2252293,
		name: "Huynh Mai Quoc Khang",
		email: "khang.huynhmaiquoc@hcmut.edu.vn",
		role: "student",
		password: "quockhang",
	},
	{
		id: 2252263,
		name: "Tran Duy Duc Huy",
		email: "huy.tranduyduc@hcmut.edu.vn",
		role: "student",
		password: "duchuy",
	},
	{
		id: 2252210,
		name: "Nguyen Quang Duy",
		email: "huy.nguyenquang@hcmut.edu.vn",
		role: "student",
		password: "quangduy",
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
		_id: "ROOM_B1_102",
		name: "Room B1 102",
		building: "B1",
		room_number: 102,
		capacity: 60,
		devices: ["light", "fan", "sound_system", "projector", "camera"],
		corridor_id: "CORRIDOR_B1_1",
	},
	{
		_id: "ROOM_B1_103",
		name: "Room B1 103",
		building: "B1",
		room_number: 103,
		capacity: 80,
		devices: ["light", "fan", "projector", "camera"],
		corridor_id: "CORRIDOR_B1_3",
	},
	{
		_id: "ROOM_B1_104",
		name: "Room B1 104",
		building: "B1",
		room_number: 104,
		capacity: 50,
		devices: ["light", "fan", "sound_system", "projector", "camera"],
		corridor_id: "CORRIDOR_B1_4",
	},
	{
		_id: "ROOM_B2_201",
		name: "Room B2 201",
		building: "B2",
		room_number: 201,
		capacity: 60,
		devices: ["light", "fan", "sound_system", "projector", "camera"],
		corridor_id: "CORRIDOR_B2_1",
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
		_id: "ROOM_B2_203",
		name: "Room B2 203",
		building: "B2",
		room_number: 203,
		capacity: 50,
		devices: ["light", "fan", "sound_system", "projector", "camera"],
		corridor_id: "CORRIDOR_B2_3",
	},
	{
		_id: "ROOM_B2_204",
		name: "Room B2 204",
		building: "B2",
		room_number: 204,
		capacity: 70,
		devices: ["light", "fan", "projector", "camera"],
		corridor_id: "CORRIDOR_B2_4",
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
db.schedules.insertMany([
	// Document 1 for ROOM_B1_101 on March 26, 2025
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 7,
		endPeriod: 8,
		teacherId: 3, // Pham Tien Thanh
		lectureTitle: "Linear Algebra",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 8,
		endPeriod: 9,
		teacherId: 4, // Nguyen Le Hoa
		lectureTitle: "Discrete Mathematics",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 9,
		endPeriod: 10,
		teacherId: 5, // Tran Hai Anh
		lectureTitle: "Probability & Statistics",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 10,
		endPeriod: 11,
		teacherId: 6, // Le Vudat
		lectureTitle: "Numerical Methods",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 11,
		endPeriod: 12,
		teacherId: 7, // Nguyen Minh Quang
		lectureTitle: "Compiler Design",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 12,
		endPeriod: 13,
		teacherId: 8, // Pham Ngoc Thanh
		lectureTitle: "Cybersecurity",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 13,
		endPeriod: 14,
		teacherId: 9, // Tran Tien Khoa
		lectureTitle: "Data Structures",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 14,
		endPeriod: 15,
		teacherId: 10, // Le Duc Thanh
		lectureTitle: "Algorithms",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 15,
		endPeriod: 16,
		teacherId: 11, // Nguyen Bich Tram
		lectureTitle: "Computer Graphics",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 16,
		endPeriod: 17,
		teacherId: 12, // Pham Nguyet Anh
		lectureTitle: "Parallel Computing",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 17,
		endPeriod: 18,
		teacherId: 13, // Do Hoang Tu
		lectureTitle: "IoT Fundamentals",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		usedDate: ISODate("2025-03-26T00:00:00Z"),
		startPeriod: 18,
		endPeriod: 19,
		teacherId: 14, // Nguyen Van Nam
		lectureTitle: "Blockchain Basics",
	},

	// Document 2 for ROOM_B1_101 on March 27, 2025 (similar structure)
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-27T00:00:00Z"),
		usedDate: ISODate("2025-03-27T00:00:00Z"),
		startPeriod: 7,
		endPeriod: 8,
		teacherId: 3, // Pham Tien Thanh
		lectureTitle: "Computer Architecture",
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-27T00:00:00Z"),
		usedDate: ISODate("2025-03-27T00:00:00Z"),
		startPeriod: 8,
		endPeriod: 9,
		teacherId: 4, // Nguyen Le Hoa
		lectureTitle: "Software Engineering",
	},
	// Add more periods for the rest of the day (March 27, 2025) following the same pattern
]);
