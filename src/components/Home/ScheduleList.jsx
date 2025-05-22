import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./ScheduleList.scss";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [roomFilter, setRoomFilter] = useState("");
  const [lecturerFilter, setLecturerFilter] = useState("");
  const token = localStorage.getItem("authToken");

  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:3000/schedules", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSchedules(response.data);
      setFilteredSchedules(response.data);
      console.log("Schedules:", response.data);
    } catch (error) {
      toast.error("Error fetching schedules");
    }
  };

  useEffect(() => {
    if (token) {
      fetchSchedules();
    }
  }, [token]);

  useEffect(() => {
    let filtered = [...schedules];

    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter((schedule) => {
        if (!schedule.date) return false;
        const scheduleDate = new Date(schedule.date);
        const scheduleDateStr = scheduleDate.toISOString().split('T')[0];
        return scheduleDateStr === selectedDateStr;
      });
    }

    if (roomFilter) {
      filtered = filtered.filter((schedule) =>
        (schedule.room_id || "").toLowerCase().includes(roomFilter.toLowerCase())
      );
    }

    if (lecturerFilter) {
      filtered = filtered.filter((schedule) => {
        return String(schedule.teacherId || "").includes(lecturerFilter);
      });
    }

    setFilteredSchedules(filtered);
  }, [selectedDate, roomFilter, lecturerFilter, schedules]);

  if (!token) return null;

  return (
    <div className="schedule-list">
      <h1>Schedule List</h1>

      <div className="filters">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Filter by Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>

        <TextField
          label="Filter by Room ID"
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          size="small"
        />

        <TextField
          label="Filter by Lecturer ID"
          value={lecturerFilter}
          onChange={(e) => setLecturerFilter(e.target.value)}
          size="small"
        />
      </div>

      {filteredSchedules.length === 0 ? (
        <div className="no-schedule">
          <h2>No schedules found!</h2>
        </div>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filteredSchedules.map((schedule) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={schedule._id || schedule.id}>
                <div className="schedule-card">
                  <h3>Room: {schedule.room_id || "-"}</h3>
                  <p>Lecturer: {schedule.teacherId || "-"}</p>
                  <p>Date: {schedule.date ? new Date(schedule.date).toLocaleDateString() : "-"}</p>
                  <p>Time: {(schedule.startPeriod && schedule.endPeriod) ? `${schedule.startPeriod} - ${schedule.endPeriod}` : "-"}</p>
                  <p>Lecture: {schedule.lectureTitle || "-"}</p>
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default ScheduleList;
