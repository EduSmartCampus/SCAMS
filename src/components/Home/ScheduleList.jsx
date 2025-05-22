import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import "./ScheduleList.scss";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
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
      console.log("Schedules:", response.data);
    } catch (error) {
      toast.error("Error fetching schedules");
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    setRoomFilter("");
    setLecturerFilter("");
  };

  useEffect(() => {
    fetchSchedules();

    return () => {
        handleClear();
    }
  }, []);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const matchesDate =
        !selectedDate ||
        new Date(schedule.usedDate).toDateString() ===
          new Date(selectedDate).toDateString();

      const matchesRoom = schedule.room_id
        ?.toLowerCase()
        .includes(roomFilter.toLowerCase());

      const matchesLecturer = String(schedule.teacherId || "").includes(
        lecturerFilter
      );

      return (
        matchesDate &&
        (!roomFilter || matchesRoom) &&
        (!lecturerFilter || matchesLecturer)
      );
    });
  }, [schedules, selectedDate, roomFilter, lecturerFilter]);

  const formatHour = (hour) => {
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    });
  };

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

        <button className="filter-button" onClick={handleClear}>
          <FilterListOffIcon className="filter-icon" />
        </button>
      </div>

      {filteredSchedules.length === 0 ? (
        <div className="no-schedule">
          <h2>No schedules found!</h2>
        </div>
      ) : (
        <div className="list-sched">
          <Grid container spacing={2} justifyContent="center">
            {filteredSchedules.map((schedule) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={schedule._id || schedule.id}
                >
                  <div className="schedule-card">
                    <h3>Room: {schedule.room_id || "-"}</h3>
                    <p>Lecturer ID: {schedule.teacherId || "-"}</p>
                    <p>Lecturer Name: {schedule.teacher_name || "-"}</p>
                    <p>
                      Date:{" "}
                      {schedule.date
                        ? new Date(schedule.usedDate).toLocaleDateString()
                        : "-"}
                    </p>
                    <p>
                      Time:{" "}
                      {schedule.startPeriod !== undefined &&
                      schedule.endPeriod !== undefined
                        ? `${formatHour(schedule.startPeriod)} - ${formatHour(
                            schedule.endPeriod
                          )}`
                        : "-"}
                    </p>
                    <p>Lecture: {schedule.lectureTitle || "-"}</p>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
