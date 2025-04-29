const { isDBoverload } = require("../controllers/database.controller");

isDBoverload();

setInterval(() => {
	console.log("🕒 Kiểm tra quá tải DB...");
	isDBoverload();
}, 1 * 60 * 1000);