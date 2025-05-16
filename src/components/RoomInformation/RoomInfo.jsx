import "./RoomInfo.scss";
import Room from "../Room/Room";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, getDay } from "date-fns";
import vi from "date-fns/locale/vi";
import { useSchedule } from "../../context/ScheduleContext";
import { useFilter } from "../../context/FilterContext";

const locales = { vi: vi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => 1,
  getDay,
  locales,
});

const RoomInfo = () => {
  const [roomInfo, setRoomInfo] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const { isEdit, selectedEvent, changeRoomName, setSelectedEvent } = useSchedule();
  const { clearFilter } = useFilter();

  const fetchRoomInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/rooms/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setSchedules(response.data.schedules);
      setRoomInfo(response.data.room);
      changeRoomName(response.data.room.name);
    } catch (error) {
      toast.error("Fetch room information failed!");
    }
  };

  useEffect(() => {
    fetchRoomInfo();
  }, []);

  const events = schedules.map((schedule) => {
    const startHour = schedule.startPeriod;
    const endHour = schedule.endPeriod;

    const start = new Date(schedule.usedDate);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(schedule.usedDate);
    end.setHours(endHour, 0, 0, 0);

    return {
      id: schedule.id,
      title: schedule.lectureTitle,
      lecturer_name: schedule.teacherName,
      lecturer_id: schedule.teacherId,
      room_name: schedule.roomName,
      start,
      end,
    };
  });

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: "#1a73e8",
      color: "white",
      border: "none",
      display: "block",
      padding: "8px 12px",
      fontSize: "0.8rem",
      whiteSpace: "normal",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
    },
    title: `${event.title} (${event.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${event.end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })})`,
  });

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const formats = {
    timeGutterFormat: "HH:mm",
    eventTimeRangeFormat: ({ start, end }, culture, local) =>
      `${local.format(start, "HH:mm", culture)} - ${local.format(
        end,
        "HH:mm",
        culture
      )}`,
  };

  return (
    <div className="room-info">
      <Link to="/home" className="back" onClick={clearFilter}>
        <KeyboardBackspaceIcon className="back-icon" />
        <p>Back to home page</p>
      </Link>
      <Room roomInfo={roomInfo} />
      <div style={{ margin: "10px 0" }}>
        <label>Choose a day: </label>
        <input
          type="date"
          onChange={(e) => setCurrentDate(new Date(e.target.value))}
          value={format(currentDate, "yyyy-MM-dd")}
          className="date-change"
        />
      </div>
      <div className="calender">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          defaultView="week"
          views={["week"]}
          showMultiDayTimes={false}
          allDayAccessor={() => false}
          style={{ height: "100%" }}
          eventPropGetter={eventStyleGetter}
          formats={formats}
          popup
          date={currentDate}
          onNavigate={handleNavigate}
          min={new Date(2025, 0, 1, 7, 0)}
          max={new Date(2025, 0, 1, 23, 0)}
          scrollToTime={new Date(2025, 1, 1, 7, 0, 0)}
          onSelectEvent={(event) => handleEventClick(event)}
        />
      </div>
    </div>
  );
};

export default RoomInfo;
