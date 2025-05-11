import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ScheduleRegistration.scss";
import TimeSelector from "../TimeSelector/TimeSelector";
import DateSelector from "../DateSelector/DateSelector";
import SubjectSelector from "../SubjectSelector/SubjectSelector";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { useSchedule } from "../../context/ScheduleContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ScheduleRegistration = () => {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  const [subject, setSubject] = useState("Calculus 1");
  const [startTime, setStartTime] = useState('07:00'); 
  const [endTime, setEndTime] = useState('08:00'); 
  const [selectedDate, setSelectedDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const { isScheduleOpen, toggleSchedule, roomName } = useSchedule();
  const token = localStorage.getItem("authToken");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userInfo == null) {
      toast.error("You must be logged in as a lecturer to book a room.");
      return;
    }

    if (selectedDate == "" || subject == "") {
      toast.error("Please fill in all required fields (Room ID, Date, Subject).");
      return;
    }

    try {
      setIsBooked(true);

      const bookingData = {
        room_id: id,
        usedDate: selectedDate,
        startPeriod: parseInt(startTime.split(':')[0]),
        endPeriod: parseInt(endTime.split(':')[0]),
        teacherId: userInfo.id,
        lectureTitle: subject,
      };

      const response = await axios.post("http://localhost:3000/schedules", bookingData, {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(
          `Room booked successfully for ${subject} on ${selectedDate} from ${startTime} to ${endTime}!`
        ); 
        setTimeout(() => {
          toggleSchedule(); 
          window.location.reload();
          setIsBooked(false);
        }, 2000)
      } else {
        toast.error("Failed to book the room. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred while booking the room. Please try again.");
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  }

  useEffect(() => {
    console.log(selectedDate);
    console.log(subject);
    console.log(userInfo)
    console.log(token)
  }, [selectedDate, subject, userInfo, token])

  return (
    <div className="outside-form">
      <div className={`schedule-registration ${isScheduleOpen ? 'open': ''}`}>
        <button className="close-icon" onClick={toggleSchedule}>
          <CloseIcon className="icon" />
        </button>
        <h2>Schedule Registration</h2>
        <h3>{roomName}</h3>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label>Date: </label>
            <DateSelector selectedDate={selectedDate} handleDateChange={handleDateChange} minDate={new Date().toISOString().split('T')[0]} />
          </div>
          <TimeSelector startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} />
          <div>
            <label>Subject: </label>
            <SubjectSelector subject={subject} handleSubjectChange={handleSubjectChange} />
          </div>
          <button type="submit" disabled={isBooked}>
            {isBooked ? <CircularProgress size="16px" style={{'color': '#fff'}} /> : "Book Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleRegistration;
