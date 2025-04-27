const Schedule = require('../models/Schedule');

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Error fetching schedules" });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
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
      lectureTitle
    });

    const savedSchedule = await newSchedule.save();
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

    const { room_id, date, usedDate, startPeriod, endPeriod, lectureTitle } = req.body;

    if (room_id !== undefined) schedule.room_id = room_id;
    if (date !== undefined) schedule.date = date;
    if (usedDate !== undefined) schedule.usedDate = usedDate;
    if (startPeriod !== undefined) schedule.startPeriod = startPeriod;
    if (endPeriod !== undefined) schedule.endPeriod = endPeriod;
    if (lectureTitle !== undefined) schedule.lectureTitle = lectureTitle;

    const updatedSchedule = await schedule.save();
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
  deleteSchedule
};
