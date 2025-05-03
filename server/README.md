## Schedules
- The main `id` used in `GetById`, `Update` and `Delete` is the field `id` in table, not `_id`.
- `GetAllSchedules` can be filtered by `date, room_id, teacherId, usedDate`
- `Create` and `Update` schedule are already checked the overlapped schedules (same usedDate, room and overlapped period)
- User must be authorized as lecturer to `Create`, `Update` and `Delete` schedule. The lecturer who creates schedules has the right to update and delete his/her own schedules.
