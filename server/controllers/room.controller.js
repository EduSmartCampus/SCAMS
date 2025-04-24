// controllers/room.controller.js
const Room = require("../models/Room");
const Schedule = require("../models/Schedule");
const getAllRooms = async (req, res) => {
	try {
		const { building, device } = req.query;
		let filter = {};

		// Lọc theo building
		if (building) filter.building = building;

		// Lọc theo device (nếu có)
		if (device) {
			filter.devices = { $in: [device] };
		}

		// Lấy danh sách phòng theo các filter
		const rooms = await Room.find(filter);

		// Trả về danh sách phòng học
		res.json(rooms);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Lỗi lấy danh sách phòng", error: err.message });
	}
};

// lấy phòng theo ID
const getRoomById = async (req, res) => {
	try {
		// Lấy phòng theo ID
		const room = await Room.findOne({ _id: req.params.id });
		if (!room) {
			return res.status(404).json({ message: "Không tìm thấy phòng" });
		}

		// Lấy tất cả lịch của phòng theo room_id và sắp xếp theo ngày
		const schedules = await Schedule.find({ room_id: room._id }).sort({
			date: 1,
		});

		res.json({
			room,
			schedules, // Gửi kèm lịch đặt của phòng đó
		});
	} catch (err) {
		res.status(500).json({ message: "Lỗi server", error: err.message });
	}
};

// tạo phòng mới -> successful
const createRoom = async (req, res) => {
	try {
		const {
			_id,
			roomName,
			building,
			roomNumber,
			capacity,
			devices,
			corridor_id,
		} = req.body;

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
		res.status(201).json(room);
	} catch (err) {
		res.status(400).json({ message: "Lỗi tạo phòng", error: err.message });
	}
};

// cập nhật phòng
const updateRoom = async (req, res) => {
	try {
		const roomId = req.params.id;

		// Phần cập nhật phòng
		const {
			roomName,
			roomNumber,
			capacity,
			devices,
			building,
			corridor_id,
			scheduleUpdates, // Dữ liệu lịch mới
		} = req.body;

		const updateData = {};
		if (roomName !== undefined) updateData.name = roomName;
		if (roomNumber !== undefined) updateData.room_number = roomNumber;
		if (capacity !== undefined) updateData.capacity = capacity;
		if (devices !== undefined) updateData.devices = devices;
		if (building !== undefined) updateData.building = building;
		if (corridor_id !== undefined) updateData.corridor_id = corridor_id;

		// Cập nhật phòng
		const updatedRoom = await Room.findOneAndUpdate(
			{ _id: roomId },
			updateData,
			{ new: true }
		);

		if (!updatedRoom) {
			return res
				.status(404)
				.json({ message: "Không tìm thấy phòng để cập nhật" });
		}

		// Nếu có lịch cần cập nhật
		if (Array.isArray(scheduleUpdates)) {
			for (const sched of scheduleUpdates) {
				const { date, startPeriod, endPeriod, teacherId, lectureTitle } = sched;

				// Kiểm tra xem có phòng và ngày này đã có lịch hay chưa
				const existingSchedule = await Schedule.findOne({
					room_id: roomId,
					date,
					startPeriod,
				});

				if (!existingSchedule) {
					// Nếu không tìm thấy lịch cho ngày và startPeriod đó, báo lỗi
					return res.status(404).json({
						message: `Không có lịch nào cho ngày ${date} và period ${startPeriod}`,
					});
				}

				// Cập nhật lịch nếu đã có, chưa có thì tạo mới
				await Schedule.findOneAndUpdate(
					{ room_id: roomId, date, startPeriod },
					{
						$set: {
							teacherId,
							lectureTitle,
							room_id: roomId,
							date,
							startPeriod,
							endPeriod,
						},
					},
					{ upsert: true, new: true }
				);
			}
		}

		res.json({ message: "Đã cập nhật phòng", room: updatedRoom });
	} catch (err) {
		res.status(400).json({ message: "Lỗi cập nhật phòng", error: err.message });
	}
};

// xóa phòng -> successful
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
