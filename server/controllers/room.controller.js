// controllers/room.controller.js
const Room = require("../models/Room");
const Schedule = require("../models/Schedule");
const { queryMysql } = require("../MySQL/test");
const useBackupDB = require("../global");

// lấy tất cả rooms
const getAllRooms = async (req, res) => {
	try {
		console.log("[getAllRooms] useBackupDB:", useBackupDB.useBackupDB);
		const { building, device } = req.query;

		if (useBackupDB.useBackupDB) {
			let sql = "SELECT * FROM rooms";
			const params = [];

			if (building) {
				sql += " WHERE building = ?";
				params.push(building);
			}

			const rooms = await queryMysql(sql, params);

			// parse devices text field into array
			for (const room of rooms) {
				room.devices = room.devices ? room.devices.split(",") : [];
			}

			if (device) {
				return res.json(rooms.filter((r) => r.devices.includes(device)));
			}

			return res.json(rooms);
		} else {
			let filter = {};
			if (building) filter.building = building;
			if (device) filter.devices = { $in: [device] };
			const rooms = await Room.find(filter);
			return res.json(rooms);
		}
	} catch (err) {
		res
			.status(500)
			.json({ message: "Lỗi lấy danh sách phòng", error: err.message });
	}
};

// lấy room theo id
const getRoomById = async (req, res) => {
	try {
		console.log("[getRoomById] useBackupDB:", useBackupDB.useBackupDB);
		const roomId = req.params.id;

		if (useBackupDB.useBackupDB) {
			const rooms = await queryMysql("SELECT * FROM rooms WHERE id = ?", [
				roomId,
			]);
			if (rooms.length === 0)
				return res.status(404).json({ message: "Không tìm thấy phòng" });
			const room = rooms[0];
			room.devices = room.devices ? room.devices.split(",") : [];

			const schedules = await queryMysql(
				`SELECT * FROM schedules WHERE room_id = ? ORDER BY date ASC, startPeriod ASC`,
				[roomId]
			);

			return res.json({ room, schedules });
		} else {
			const room = await Room.findOne({ _id: roomId });
			if (!room)
				return res.status(404).json({ message: "Không tìm thấy phòng" });
			const schedules = await Schedule.find({ room_id: room._id }).sort({
				date: 1,
			});
			return res.json({ room, schedules });
		}
	} catch (err) {
		res.status(500).json({ message: "Lỗi server", error: err.message });
	}
};

// tạo room mới
const createRoom = async (req, res) => {
	try {
		console.log("[createRoom] Ghi cả vào MongoDB và MySQL");
		if (req.user.role !== "staff") {
			return res.status(403).json({ message: "Only staff can create rooms" });
		}

		const {
			_id,
			roomName,
			building,
			roomNumber,
			capacity,
			devices,
			corridor_id,
		} = req.body;

		// MongoDB
		const room = new Room({
			_id,
			name: roomName,
			building,
			room_number: roomNumber,
			capacity,
			devices,
			corridor_id,
		});
		await room.save();

		// MySQL (store devices as comma-separated string)
		await queryMysql(
			`INSERT INTO rooms (id, name, building, room_number, capacity, devices, corridor_id)
			 VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				_id,
				roomName,
				building,
				roomNumber,
				capacity,
				devices.join(","),
				corridor_id,
			]
		);

		res.status(201).json({ message: "Tạo phòng thành công", room });
	} catch (err) {
		res.status(400).json({ message: "Lỗi tạo phòng", error: err.message });
	}
};

// cập nhật room
const updateRoom = async (req, res) => {
	try {
		console.log("[updateRoom] Ghi cả vào MongoDB và MySQL");
		if (req.user.role !== "staff") {
			return res.status(403).json({ message: "Only staff can update rooms" });
		}

		const roomId = req.params.id;
		const { roomName, roomNumber, capacity, devices, building, corridor_id } =
			req.body;

		const updateData = {};
		if (roomName !== undefined) updateData.name = roomName;
		if (roomNumber !== undefined) updateData.room_number = roomNumber;
		if (capacity !== undefined) updateData.capacity = capacity;
		if (devices !== undefined) updateData.devices = devices;
		if (building !== undefined) updateData.building = building;
		if (corridor_id !== undefined) updateData.corridor_id = corridor_id;

		// MongoDB
		const updatedRoom = await Room.findOneAndUpdate(
			{ _id: roomId },
			updateData,
			{ new: true }
		);

		// MySQL
		await queryMysql(
			`UPDATE rooms SET name = ?, room_number = ?, capacity = ?, building = ?, devices = ?, corridor_id = ? WHERE id = ?`,
			[
				roomName,
				roomNumber,
				capacity,
				building,
				devices.join(","),
				corridor_id,
				roomId,
			]
		);

		res.json({ message: "Đã cập nhật phòng", room: updatedRoom });
	} catch (err) {
		res.status(400).json({ message: "Lỗi cập nhật phòng", error: err.message });
	}
};

// xóa room
const deleteRoom = async (req, res) => {
	try {
		console.log("[deleteRoom] Ghi cả vào MongoDB và MySQL");
		if (req.user.role !== "staff") {
			return res.status(403).json({ message: "Only staff can delete rooms" });
		}

		const roomId = req.params.id;

		// MongoDB
		await Room.findByIdAndDelete(roomId);

		// MySQL
		await queryMysql(`DELETE FROM schedules WHERE room_id = ?`, [roomId]);
		await queryMysql(`DELETE FROM rooms WHERE id = ?`, [roomId]);

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
