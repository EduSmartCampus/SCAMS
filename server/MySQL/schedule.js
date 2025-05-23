const { decrypt } = require('../controllers/auth.controller');
const { queryMysql } = require('./test');
// Schedule
async function getAllSchedulesFromBackup(filters = {}) {
  try {
    let baseQuery = `
      SELECT 
        s.id, s.room_id, r.name AS room_name, 
        s.date, s.usedDate, s.startPeriod, s.endPeriod, 
        s.teacherId, l.name AS teacher_name, s.lectureTitle
      FROM schedules s
      LEFT JOIN rooms r ON s.room_id = r.id
      LEFT JOIN lecturers l ON s.teacherId = l.id
    `;
    const conditions = [];
    const params = [];

    if (filters.date) {
      conditions.push("s.date = ?");
      params.push(filters.date);
    }
    if (filters.usedDate) {
      conditions.push("s.usedDate = ?");
      params.push(filters.usedDate);
    }
    if (filters.room_id) {
      conditions.push("s.room_id = ?");
      params.push(filters.room_id);
    }
    if (filters.teacherId) {
      conditions.push("s.teacherId = ?");
      params.push(filters.teacherId);
    }

    if (conditions.length > 0) {
      baseQuery += " WHERE " + conditions.join(" AND ");
    }

    const schedules = await queryMysql(baseQuery, params);

    // Decrypt teacher_name for each schedule
    const formattedSchedules = schedules.map((schedule) => {
      let teacherName = null;
      if (schedule.teacher_name) {
        try {
          teacherName = decrypt(schedule.teacher_name);
        } catch (decryptErr) {
          console.error(`Decryption error for lecturer id ${schedule.teacherId}:`, decryptErr);
          teacherName = null;
        }
      }
      return {
        _id: schedule.id,
        id: schedule.id,
        room_id: schedule.room_id || null,
        room_name: schedule.room_name || null,
        date: schedule.date ? new Date(schedule.date).toISOString() : null,
        usedDate: schedule.usedDate ? new Date(schedule.usedDate).toISOString() : null,
        startPeriod: schedule.startPeriod,
        endPeriod: schedule.endPeriod,
        teacherId: schedule.teacherId,
        teacher_name: teacherName,
        lectureTitle: schedule.lectureTitle,
      };
    });

    return formattedSchedules;
  } catch (err) {
    console.error("Error in getAllSchedulesFromBackup:", err);
    throw new Error("Error fetching schedules from backup");
  }
}

async function getScheduleByIdFromBackup(id) {
  try {
    const rows = await queryMysql(
      `
      SELECT 
        s.id, s.room_id, r.name AS room_name, 
        s.date, s.usedDate, s.startPeriod, s.endPeriod, 
        s.teacherId, l.name AS teacher_name, s.lectureTitle
      FROM schedules s
      LEFT JOIN rooms r ON s.room_id = r.id
      LEFT JOIN lecturers l ON s.teacherId = l.id
      WHERE s.id = ?
      `,
      [id]
    );

    if (!rows[0]) {
      return null;
    }

    const schedule = rows[0];
    let teacherName = null;
    if (schedule.teacher_name) {
      try {
        teacherName = decrypt(schedule.teacher_name);
      } catch (decryptErr) {
        console.error(`Decryption error for lecturer id ${schedule.teacherId}:`, decryptErr);
        teacherName = null;
      }
    }

    return {
      _id: schedule.id,
      id: schedule.id,
      room_id: schedule.room_id || null,
      room_name: schedule.room_name || null,
      date: schedule.date ? new Date(schedule.date).toISOString() : null,
      usedDate: schedule.usedDate ? new Date(schedule.usedDate).toISOString() : null,
      startPeriod: schedule.startPeriod,
      endPeriod: schedule.endPeriod,
      teacherId: schedule.teacherId,
      teacher_name: teacherName,
      lectureTitle: schedule.lectureTitle,
    };
  } catch (err) {
    console.error("Error in getScheduleByIdFromBackup:", err);
    throw new Error("Error fetching schedule from backup");
  }
}


async function insertScheduleToBackup(schedule) {
  const {
    id,
    room_id,
    date,
    usedDate,
    startPeriod,
    endPeriod,
    teacherId,
    lectureTitle,
  } = schedule;

  await queryMysql(
    "INSERT INTO schedules (id, room_id, date, usedDate, startPeriod, endPeriod, teacherId, lectureTitle) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, room_id, date, usedDate, startPeriod, endPeriod, teacherId, lectureTitle]
  );
}

async function updateScheduleInBackup(id, updatedFields) {
  const keys = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  const setClause = keys.map((key) => `${key} = ?`).join(", ");

  await queryMysql(`UPDATE schedules SET ${setClause} WHERE id = ?`, [...values, id]);
}

async function deleteScheduleFromBackup(id) {
  await queryMysql("DELETE FROM schedules WHERE id = ?", [id]);
}

module.exports = {
  getAllSchedulesFromBackup,
  getScheduleByIdFromBackup,
  insertScheduleToBackup,
  updateScheduleInBackup,
  deleteScheduleFromBackup
}