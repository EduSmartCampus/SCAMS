// controllers/room.controller.js
const Room = require("../models/Room");

const getAllRooms = async (req, res) => {
	try {
		const rooms = await Room.find();
		res.json(rooms);
	} catch (err) {
		res.status(500).json({ message: "Lỗi lấy danh sách phòng" });
	}
};

const getRoomById = async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		if (!room) return res.status(404).json({ message: "Không tìm thấy phòng" });
		res.json(room);
	} catch (err) {
		res.status(500).json({ message: "Lỗi server" });
	}
};

const createRoom = async (req, res) => {
	try {
		const room = new Room(req.body);
		await room.save();
		res.status(201).json(room);
	} catch (err) {
		res.status(400).json({ message: "Lỗi tạo phòng", error: err.message });
	}
};

const updateRoom = async (req, res) => {
	try {
		const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(room);
	} catch (err) {
		res.status(400).json({ message: "Lỗi cập nhật phòng" });
	}
};

const deleteRoom = async (req, res) => {
	try {
		await Room.findByIdAndDelete(req.params.id);
		res.json({ message: "Đã xoá phòng thành công" });
	} catch (err) {
		res.status(500).json({ message: "Lỗi xoá phòng" });
	}
};

module.exports = {
	getAllRooms,
	getRoomById,
	createRoom,
	updateRoom,
	deleteRoom,
};
