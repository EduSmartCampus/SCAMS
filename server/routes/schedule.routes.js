const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

const {
	getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule
} = require("../controllers/schedules.controller");

router.get("/", getAllSchedules); // GET /schedules
router.get("/:id", getScheduleById); // GET /schedules/:id
router.post("/", authMiddleware, createSchedule); // POST /schedules
router.put("/:id", authMiddleware, updateSchedule); // PUT /schedules/:id
router.delete("/:id", authMiddleware, deleteSchedule); // DELETE /schedules/:id

module.exports = router;