const useBackupDB = require("../global");
const Room = require("../models/Room");
const {
    queryMysql
} = require("../MySQL/test");

const isDBoverload = async (res = null) => {
	const mongoPromise = Room.find();
	const timeout = new Promise((_, reject) =>
		setTimeout(() => reject(new Error("MongoDB timeout")), 2000)
	);

	try {
		const rooms = await Promise.race([mongoPromise, timeout]);
		if (res) return res.json(rooms); // ✅ only respond if res exists
		else console.log("✅ MongoDB OK");
	} catch (err) {
		console.warn("⚠️ MongoDB bị lỗi hoặc chậm, chuyển sang MySQL");
		useBackupDB.useBackupDB = true;

		try {
			const mysqlRooms = await queryMysql("SELECT * FROM rooms");
			if (res) return res.json(mysqlRooms); // ✅ only respond if res exists
			else console.log("✅ MySQL fallback OK");
		} catch (mysqlErr) {
			console.error("❌ MySQL cũng lỗi:", mysqlErr.message);
			if (res) return res.status(500).send("Lỗi cả MongoDB lẫn MySQL");
			else console.error("❌ Lỗi cả MongoDB lẫn MySQL (không có res để trả)");
		}
	}
};

module.exports = {
	isDBoverload
};
