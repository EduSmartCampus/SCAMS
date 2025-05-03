const Schedule = require('../models/Schedule');
const { v4: uuidv4 } = require('uuid');
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
    const { date, room_id, teacherId, usedDate } = req.query;

    if (useBackupDB) {
      const schedules = await getAllSchedulesFromBackup({ date, room_id, teacherId, usedDate });
      return res.json(schedules);
    }

    const filter = {};
    if (date) filter.date = date;
    if (room_id) filter.room_id = room_id;
    if (teacherId) filter.teacherId = teacherId;
    if (usedDate) filter.usedDate = usedDate;

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
    const schedule = await Schedule.findOne({ id: req.params.id });
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

    const { room_id, usedDate, startPeriod, endPeriod, lectureTitle } = req.body;

    // Check for overlapping schedule
    const hasOverlap = await isScheduleOverlapping({ room_id, usedDate, startPeriod, endPeriod });
    if (hasOverlap) {
      return res.status(400).json({ message: "Schedule overlaps with existing schedule" });
    }

    const customId = uuidv4();

    const newSchedule = new Schedule({
      id: customId,
      room_id,
      date: new Date(),
      usedDate,
      startPeriod,
      endPeriod,
      teacherId: req.user.id,
      lectureTitle,
    });

    const savedSchedule = await newSchedule.save();

    await insertScheduleToBackup({
      id: customId,
      room_id,
      date: savedSchedule.date,
      usedDate,
      startPeriod,
      endPeriod,
      teacherId: req.user.id,
      lectureTitle
    });

    res.status(201).json(savedSchedule);
  } catch (err) {
    console.error("Error in createSchedule:", err);
    res.status(500).json({ message: "Error creating schedule", error: err });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const schedule = await Schedule.findOne( { id: scheduleId } );

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (req.user.type !== 'lecturer' || req.user.id !== schedule.teacherId) {
      return res.status(403).json({ message: "Not authorized to edit this schedule" });
    }

    const {
      room_id,
      usedDate,
      startPeriod,
      endPeriod,
      lectureTitle,
    } = req.body

    // Check for overlapping schedule
    const hasOverlap = await isScheduleOverlapping({
      room_id,
      usedDate,
      startPeriod,
      endPeriod,
      excludeId: scheduleId,
    });
    if (hasOverlap) {
      return res.status(400).json({ message: "Schedule overlaps with existing schedule" });
    }

    const updateData = {};
    updateData.date = new Date();
    if (room_id !== undefined) updateData.room_id = room_id;
    if (usedDate !== undefined) updateData.usedDate = usedDate;
    if (startPeriod !== undefined) updateData.startPeriod = startPeriod;
    if (endPeriod !== undefined) updateData.endPeriod = endPeriod;
    if (lectureTitle !== undefined) updateData.lectureTitle = lectureTitle;

    const updatedSchedule = await Schedule.findOneAndUpdate(
      { id: scheduleId },
      updateData,
      { new: true }
    )

    await updateScheduleInBackup(req.params.id, updateData);

    res.json(updatedSchedule);
  } catch (err) {
    res.status(500).json({ message: "Error updating schedule", err });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ id: req.params.id});
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (req.user.type !== 'lecturer' || req.user.id !== schedule.teacherId) {
      return res.status(403).json({ message: "Not authorized to delete this schedule" });
    }

    await schedule.deleteOne();
    await deleteScheduleFromBackup(req.params.id);

    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting schedule" });
  }
};

const isScheduleOverlapping = async ({ room_id, usedDate, startPeriod, endPeriod, excludeId }) => {
  const query = {
    room_id,
    usedDate,
    startPeriod: { $lte: endPeriod },
    endPeriod: { $gte: startPeriod },
  };

  if (excludeId) {
    query.id = { $ne: excludeId };
  }

  const overlappingSchedule = await Schedule.findOne(query);
  
  return !!overlappingSchedule;
};


module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
