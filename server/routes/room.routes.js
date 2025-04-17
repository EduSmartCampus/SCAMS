const express = require("express");
const router = express.Router();
// const { login } = require('../controllers/auth.controller');

// file này sẽ nối phânf còn lại của endpoint với hàm logic sẽ được viết trong controller

// router.get('/info', info); // phần còn lại của endpoint + hàm info ứng vs endpoint dc viếtviết trong folder controller
// router.post('/register', register);
// router.get('/schedule', schedule);

const {
	getAllRooms,
	getRoomById,
	createRoom,
	updateRoom,
	deleteRoom,
} = require("../controllers/room.controller");

router.get("/", getAllRooms); // GET /room
router.get("/:id", getRoomById); // GET /room/:id
router.post("/", createRoom); // POST /room
router.put("/:id", updateRoom); // PUT /room/:id
router.delete("/:id", deleteRoom); // DELETE /room/:id

module.exports = router;
