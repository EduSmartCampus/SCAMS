const queryMysql = require('./test');
// Schedule
async function getAllSchedulesFromBackup(filters = {}) {
  let baseQuery = "SELECT * FROM schedules";
  const conditions = [];
  const params = [];

  if (filters.date) {
    conditions.push("date = ?");
    params.push(filters.date);
  }
  if (filters.usedDate) {
    conditions.push("usedDate = ?");
    params.push(filters.usedDate)
  }
  if (filters.room_id) {
    conditions.push("room_id = ?");
    params.push(filters.room_id);
  }
  if (filters.teacherId) {
    conditions.push("teacherId = ?");
    params.push(filters.teacherId);
  }

  if (conditions.length > 0) {
    baseQuery += " WHERE " + conditions.join(" AND ");
  }

  return await queryMysql(baseQuery, params);
}


async function getScheduleByIdFromBackup(id) {
  const rows = await queryMysql("SELECT * FROM schedules WHERE id = ?", [id]);
  return rows[0];
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