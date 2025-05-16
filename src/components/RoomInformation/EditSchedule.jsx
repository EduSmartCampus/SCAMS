import { useSchedule } from "../../context/ScheduleContext";
import CloseIcon from "@mui/icons-material/Close";
import "./EditSchedule.scss";
import { useEffect, useState } from "react";
import Selection from "../SearchBar/Selection";
import { toast } from "react-toastify";
import axios from "axios";
import TimeSelector from "../TimeSelector/TimeSelector";
import DateSelector from "../DateSelector/DateSelector";
import SubjectSelector from "../SubjectSelector/SubjectSelector";
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";

const EditSchedule = () => {
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const { selectedEvent, roomName, toggleEdit } = useSchedule();
  const [listRoom, setListRoom] = useState([]);
  const [room, setRoom] = useState(roomName);
  const [subject, setSubject] = useState(selectedEvent.title);
  const [startTime, setStartTime] = useState(formatTime(selectedEvent.start));
  const [endTime, setEndTime] = useState(formatTime(selectedEvent.end));
  const [selectedDate, setSelectedDate] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const token = localStorage.getItem("authToken");
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const fetchRoom = async () => {
    try {
      const response = await axios.get("http://localhost:3000/rooms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setListRoom(response.data);
    } catch (error) {
      toast.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedDate == "" || subject == "") {
        toast.error("Please fill in all required fields (Room ID, Date, Subject).");
        return;
    }

    const selectedRoomObj = listRoom.find((r) => r.name == room);
    const roomId = selectedRoomObj?._id;

    if (!roomId) {
        toast.error("Invalid room ID.");
        return;
    }

    try {
        setIsUpdate(true);
  
        const updatingData = {
          room_id: roomId,
          usedDate: selectedDate,
          startPeriod: parseInt(startTime.split(':')[0]),
          endPeriod: parseInt(endTime.split(':')[0]),
          lectureTitle: subject,
          teacherId: userInfo.id,
        };
  
        const response = await axios.put(`http://localhost:3000/schedules/${selectedEvent.id}`, updatingData, {
          headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          toast.success(
            `Schedule updated successfully for ${subject} on ${selectedDate} from ${startTime} to ${endTime}!`
          ); 
          setTimeout(() => {
            setIsUpdate(false);
            window.location.reload();
          }, 2000)
        } else {
          toast.error("Failed to update schedule. Please try again.");
        }
      } catch (err) {
        toast.error("An error occurred while updating schedule. Please try again.");
    }
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  }

  return (
    <div className="outside-edit-popup">
      <div className="edit-popup">
        <button className="close-icon" onClick={toggleEdit}>
          <CloseIcon className="icon" />
        </button>
        <h2>Edit Schedule</h2>
        <form className="edit-form" onSubmit={(event) => handleSubmit(event)}>
          <div>
            <label>Room:</label>
            <Selection
              value={room}
              options={listRoom}
              id="room"
              onChange={setRoom}
            />
          </div>
          <div>
            <label>Date: </label>
            <DateSelector selectedDate={selectedDate} handleDateChange={handleDateChange} minDate={new Date().toISOString().split('T')[0]} />
          </div>
          <TimeSelector
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
          <div>
            <label>Subject: </label>
            <SubjectSelector subject={subject} handleSubjectChange={handleSubjectChange} />
          </div>
          <button type="submit" disabled={isUpdate}>
            {isUpdate ? <CircularProgress size="16px" style={{'color': '#fff'}} /> : "Update Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSchedule;
