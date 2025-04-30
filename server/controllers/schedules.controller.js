const Schedule = require('../models/Schedule');
const {
  getAllSchedulesFromBackup,
  getScheduleByIdFromBackup,
  insertScheduleToBackup,
  updateScheduleInBackup,
  deleteScheduleFromBackup
} = require('../MySQL/schedule');
const  {useBackupDB}  = require('../global');

const getAllSchedules = async (req, res) => {
  try {
    const { date, room_id, teacherId } = req.query;

    if (useBackupDB) {
      const schedules = await getAllSchedulesFromBackup({ date, room_id, teacherId });
      return res.json(schedules);
    }

    // Build MongoDB query dynamically
    const filter = {};
    if (date) filter.date = date;
    if (room_id) filter.room_id = room_id;
    if (teacherId) filter.teacherId = teacherId;

    const schedules = await Schedule.find(filter);
    res.json(schedules);
  } catch (err) {
    console.error("Error in getAllSchedules:", err);
    res.status(500).json({ message: "Error fetching schedules" });
  }
};

const getScheduleById = async (req, res) => {
  try {
    if (useBackupDB) {
      const schedule = await getScheduleByIdFromBackup(req.params.id);
      if (!schedule) return res.status(404).json({ message: "Schedule not found" });
      return res.json(schedule);
    }
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedule" });
  }
};

const createSchedule = async (req, res) => {
  try {
    if (req.user.type !== 'lecturer') {
      return res.status(403).json({ message: "Only lecturers can create schedules" });
    }

    const { room_id, date, usedDate, startPeriod, endPeriod, lectureTitle } = req.body;

    const newSchedule = new Schedule({
      room_id,
      date,
      usedDate,
      startPeriod,
      endPeriod,
      teacherId: req.user.id,
      lectureTitle,
    });

    const savedSchedule = await newSchedule.save();

    // Backup
    await insertScheduleToBackup({
      id: savedSchedule.id.toString(),
      room_id,
      date,
      usedDate,
      startPeriod,
      endPeriod,
      teacherId: req.user.id,
      lectureTitle
    });

    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(500).json({ message: "Error creating schedule" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (req.user.type !== 'lecturer' || req.user.id !== schedule.teacherId.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this schedule" });
    }

    const updatedFields = req.body;

    for (let key in updatedFields) {
      schedule[key] = updatedFields[key];
    }

    const updatedSchedule = await schedule.save();

    await updateScheduleInBackup(req.params.id, updatedFields);

    res.json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ message: "Error updating schedule" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (req.user.type !== 'lecturer' || req.user.id !== schedule.teacherId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this schedule" });
    }

    await schedule.deleteOne();
    await deleteScheduleFromBackup(req.params.id);

    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting schedule" });
  }
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
