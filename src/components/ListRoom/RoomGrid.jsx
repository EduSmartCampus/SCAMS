import './RoomGrid.scss'
import { Link } from "react-router-dom";

const RoomGrid = ({ room }) => {
    return (
        <Link to={`/room/${room.id}`} className="room-grid">
            <p>{room.name}</p>
        </Link>
    );
}

export default RoomGrid;