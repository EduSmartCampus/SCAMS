import { useSchedule } from "../../context/ScheduleContext";
import "./Room.scss";

const Room = ({ roomInfo }) => {
  const { toggleSchedule } = useSchedule();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  return (
    <div>
      <div className="room">
        <p className="room-name">{roomInfo.name}</p>
        {userInfo?.type == 'lecturer' && 
        <button className="book" onClick={toggleSchedule}>
          <p>Book</p>
        </button>
        }
      </div>
      <div className="info">
        <p className="room-building"><span>Building</span>: {roomInfo.building}</p>
        <p className="room-number"><span>Room number</span>: {roomInfo.room_number}</p>
        <p className="room-capacity"><span>Capacity</span>: {roomInfo.capacity}</p>
        <p className="room-devices">
            <span>Available devices</span>: {Array.isArray(roomInfo.devices) ? roomInfo.devices.join(", ") : "No devices"}
        </p>
      </div>
    </div>
  );
};

export default Room;
