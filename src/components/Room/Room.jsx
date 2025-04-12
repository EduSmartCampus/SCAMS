import { useSchedule } from "../../context/ScheduleContext";
import "./Room.scss";

const Room = ({ roomInfo }) => {
  const { toggleSchedule } = useSchedule();

  return (
    <div>
      <div className="room">
        <p className="room-name">{roomInfo.name}</p>
        <button className="book" onClick={toggleSchedule}>
          <p>Book</p>
        </button>
      </div>
      <div className="info">
        <p className="room-building"><span>Building</span>: {roomInfo.building}</p>
        <p className="room-number"><span>Room number</span>: {roomInfo.room_number}</p>
        <p className="room-capacity"><span>Capacity</span>: {roomInfo.capaity}</p>
        <p className="room-devices">
            <span>Available devices</span>: {roomInfo.devices.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Room;
