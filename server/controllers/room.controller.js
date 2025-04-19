// controllers/room.controller.js
const Room = require("../models/Room");

// Lấy tất cả phòng
const getAllRooms = async (req, res) => {
	try {
		const { building, campus, fromDate, toDate, device } = req.query;
		let filter = {};

		if (building) filter.building = building;
		if (campus) filter.campus = campus;
		if (device) filter.devices = { $in: [device] }; // lọc thiết bị có chứa device

		let rooms = await Room.find(filter);

		// Nếu có yêu cầu lọc theo ngày, lọc các phòng còn trống trong khoảng đó
		if (fromDate && toDate) {
			const bookings = await Rooms.find({
				date: { $gte: fromDate, $lte: toDate },
			});

			const bookedRoomIds = bookings.map((b) => b.roomId.toString());
			rooms = rooms.filter(
				(room) => !bookedRoomIds.includes(room._id.toString())
			);
		}

		res.json(rooms);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Lỗi lấy danh sách phòng", error: err.message });
	}
};

// Lấy phòng theo ID (tested)
const getRoomById = async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		if (!room) {
			return res.status(404).json({ message: "Không tìm thấy phòng" });
		}
		res.json(room);
	} catch (err) {
		res.status(500).json({ message: "Lỗi server", error: err.message });
	}
};

// Tạo phòng mới (tested)
const createRoom = async (req, res) => {
	try {
		const {
			roomId, // chính là _id
			roomName, // gán vào name
			building,
			roomNumber,
			capacity,
			devices,
			corridor_id,
		} = req.body;

		const room = new Room({
			_id: roomId, // <-- gán roomId vào _id
			name: roomName, // <-- gán roomName vào name
			building,
			room_number: roomNumber, // <-- map đúng theo schema
			capacity,
			devices,
			corridor_id,
		});

		await room.save();
		res.status(201).json(room);
	} catch (err) {
		res.status(400).json({ message: "Lỗi tạo phòng", error: err.message });
	}
};

// Cập nhật thông tin phòng
const updateRoom = async (req, res) => {
	try {
		const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!room)
			return res
				.status(404)
				.json({ message: "Không tìm thấy phòng để cập nhật" });
		res.json(room);
	} catch (err) {
		res.status(400).json({ message: "Lỗi cập nhật phòng", error: err.message });
	}
};

// Xóa phòng (tested)
const deleteRoom = async (req, res) => {
	try {
		const room = await Room.findByIdAndDelete(req.params.id);
		if (!room)
			return res.status(404).json({ message: "Không tìm thấy phòng để xoá" });
		res.json({ message: "Đã xoá phòng thành công" });
	} catch (err) {
		res.status(500).json({ message: "Lỗi xoá phòng", error: err.message });
	}
};

module.exports = {
	getAllRooms,
	getRoomById,
	createRoom,
	updateRoom,
	deleteRoom,
};
