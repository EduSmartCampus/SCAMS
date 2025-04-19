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
	{
		_id: 2252263,
		name: "Tran Duy Duc Huy",
		email: "huy.tranduyduc@hcmut.edu.vn",
		role: "student",
		password: "duchuy",
	},
	{
		_id: 2252210,
		name: "Nguyen Quang Duy",
		email: "huy.nguyenquang@hcmut.edu.vn",
		role: "student",
		password: "quangduy",
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
		corridor_id: "CORRIDOR_B1_1",
	},
	{
		_id: "ROOM_B1_102",
		name: "Room B1 102",
		building: "B1",
		room_number: 102,
		capacity: 60,
		corridor_id: "CORRIDOR_B1_1",
	},
	{
		_id: "ROOM_B1_103",
		name: "Room B1 103",
		building: "B1",
		room_number: 103,
		capacity: 80,
		corridor_id: "CORRIDOR_B1_3",
	},
	{
		_id: "ROOM_B1_104",
		name: "Room B1 104",
		building: "B1",
		room_number: 104,
		capacity: 50,
		corridor_id: "CORRIDOR_B1_4",
	},
	{
		_id: "ROOM_B2_201",
		name: "Room B2 201",
		building: "B2",
		room_number: 201,
		capacity: 60,
		corridor_id: "CORRIDOR_B2_1",
	},
	{
		_id: "ROOM_B2_202",
		name: "Room B2 202",
		building: "B2",
		room_number: 202,
		capacity: 40,
		corridor_id: "CORRIDOR_B2_2",
	},
	{
		_id: "ROOM_B2_203",
		name: "Room B2 203",
		building: "B2",
		room_number: 203,
		capacity: 50,
		corridor_id: "CORRIDOR_B2_3",
	},
	{
		_id: "ROOM_B2_204",
		name: "Room B2 204",
		building: "B2",
		room_number: 204,
		capacity: 70,
		corridor_id: "CORRIDOR_B2_4",
	},
	{
		_id: "ROOM_A1_303",
		name: "Room A1 303",
		building: "A1",
		room_number: 303,
		capacity: 80,
		corridor_id: "CORRIDOR_A1_3",
	},
]);

// schedules

db.schedules.insertMany([
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-26T00:00:00Z"),
		period_1: {
			hour: 7,
			lecture_title: "Linear Algebra",
			booked_by: "pham.tienthanh@hcmut.edu.vn",
		},
		period_2: {
			hour: 8,
			lecture_title: "Discrete Mathematics",
			booked_by: "nguyen.lehoa@hcmut.edu.vn",
		},
		period_3: {
			hour: 9,
			lecture_title: "Probability & Statistics",
			booked_by: "tran.haianh@hcmut.edu.vn",
		},
		period_4: {
			hour: 10,
			lecture_title: "Numerical Methods",
			booked_by: "le.vudat@hcmut.edu.vn",
		},
		period_5: {
			hour: 11,
			lecture_title: "Compiler Design",
			booked_by: "nguyen.minhquang@hcmut.edu.vn",
		},
		period_6: {
			hour: 12,
			lecture_title: "Cybersecurity",
			booked_by: "pham.ngocthanh@hcmut.edu.vn",
		},
		period_7: {
			hour: 13,
			lecture_title: "Data Structures",
			booked_by: "tran.tienkhoa@hcmut.edu.vn",
		},
		period_8: {
			hour: 14,
			lecture_title: "Algorithms",
			booked_by: "le.ducthanh@hcmut.edu.vn",
		},
		period_9: {
			hour: 15,
			lecture_title: "Computer Graphics",
			booked_by: "nguyen.bichtram@hcmut.edu.vn",
		},
		period_10: {
			hour: 16,
			lecture_title: "Parallel Computing",
			booked_by: "pham.nguyetanh@hcmut.edu.vn",
		},
		period_11: {
			hour: 17,
			lecture_title: "IoT Fundamentals",
			booked_by: "do.hoangtu@hcmut.edu.vn",
		},
		period_12: {
			hour: 18,
			lecture_title: "Blockchain Basics",
			booked_by: "nguyen.vannam@hcmut.edu.vn",
		},
	},
	{
		room_id: "ROOM_B1_101",
		date: ISODate("2025-03-27T00:00:00Z"),
		period_1: {
			hour: 7,
			lecture_title: "Computer Architecture",
			booked_by: "pham.tienthanh@hcmut.edu.vn",
		},
		period_2: {
			hour: 8,
			lecture_title: "Software Engineering",
			booked_by: "nguyen.lehoa@hcmut.edu.vn",
		},
		period_3: {
			hour: 9,
			lecture_title: "Operating Systems",
			booked_by: "tran.haianh@hcmut.edu.vn",
		},
		period_4: {
			hour: 10,
			lecture_title: "Machine Learning",
			booked_by: "le.vudat@hcmut.edu.vn",
		},
		period_5: {
			hour: 11,
			lecture_title: "Artificial Intelligence",
			booked_by: "nguyen.minhquang@hcmut.edu.vn",
		},
		period_6: {
			hour: 12,
			lecture_title: "Mobile Development",
			booked_by: "pham.ngocthanh@hcmut.edu.vn",
		},
		period_7: {
			hour: 13,
			lecture_title: "Database Systems",
			booked_by: "tran.tienkhoa@hcmut.edu.vn",
		},
		period_8: {
			hour: 14,
			lecture_title: "Cloud Computing",
			booked_by: "le.ducthanh@hcmut.edu.vn",
		},
		period_9: {
			hour: 15,
			lecture_title: "Big Data Analytics",
			booked_by: "nguyen.bichtram@hcmut.edu.vn",
		},
		period_10: {
			hour: 16,
			lecture_title: "Internet of Things",
			booked_by: "pham.nguyetanh@hcmut.edu.vn",
		},
		period_11: {
			hour: 17,
			lecture_title: "Human-Computer Interaction",
			booked_by: "do.hoangtu@hcmut.edu.vn",
		},
		period_12: {
			hour: 18,
			lecture_title: "Network Security",
			booked_by: "nguyen.vannam@hcmut.edu.vn",
		},
	},
]);
