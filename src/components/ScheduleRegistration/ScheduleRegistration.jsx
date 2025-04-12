import React, { useState } from "react";
import "./ScheduleRegistration.scss";
import TimeSelector from "../TimeSelector/TimeSelector";
import DateSelector from "../DateSelector/DateSelector";
import SubjectSelector from "../SubjectSelector/SubjectSelector";
import CloseIcon from '@mui/icons-material/Close';
import { useSchedule } from "../../context/ScheduleContext";

const ScheduleRegistration = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [roomId, setRoomId] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [startTime, setStartTime] = useState('05:00'); // Default start time
  const [endTime, setEndTime] = useState('06:00'); // Default end time
  const [selectedDate, setSelectedDate] = useState("");
  const { isScheduleOpen, toggleSchedule } = useSchedule();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // try {
    //   const response = await fetch(
    //     `http://your-backend-url/schedule?room_id=${roomId}&date=${date}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   const scheduleData = await response.json();

    //   if (response.ok) {
    //     const slot = scheduleData.find((s) => s.hour === hourNum);
    //     if (slot && slot.occupied) {
    //       setError("This room is already booked at the selected time.");
    //       return;
    //     }
    //   } else {
    //     setError("Failed to check room availability.");
    //     return;
    //   }
    // } catch (err) {
    //   setError("An error occurred while checking room availability.");
    //   return;
    // }

    // try {
    //   const bookingData = {
    //     room_id: parseInt(roomId),
    //     date: date,
    //     hour: hourNum,
    //     occupied: true,
    //     lecturer: user ? user.username : "Guest",
    //     subject: subject,
    //   };

    //   const response = await fetch("http://your-backend-url/schedule", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bookingData),
    //   });

    //   if (response.ok) {
    //     setSuccess(
    //       `Room booked successfully for ${subject} on ${date} at ${hour}:00!`
    //     );
    //   } else {
    //     setError("Failed to book the room. Please try again.");
    //   }
    // } catch (err) {
    //   setError("An error occurred. Please try again.");
    // }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  }

  return (
    <div className="outside-form">
      <div className={`schedule-registration ${isScheduleOpen ? 'open': ''}`}>
        <button className="close-icon" onClick={toggleSchedule}>
          <CloseIcon className="icon" />
        </button>
        <h2>Schedule Registration</h2>
        <h3>Room B1-201</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date: </label>
            <DateSelector selectedDate={selectedDate} handleDateChange={handleDateChange} />
          </div>
          <TimeSelector startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} />
          <div>
            <label>Subject: </label>
            <SubjectSelector subject={subject} handleSubjectChange={handleSubjectChange} />
          </div>
          <button type="submit">Book Room</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ScheduleRegistration;
