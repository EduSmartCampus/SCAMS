import './RoomInfo.scss'
import Room from "../Room/Room";
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const RoomInfo = () => {
    const roomInfo = {
        "name": "ROOM_B1_201",
        "building": "B1",
        "room_number": "101",
        "capaity": 60,
        "devices": ["light", "fan", "sound_system", "projector", "camera"]
    }

    return (
        <div className="room-info">
            <Link to='/' className='back'>
                <KeyboardBackspaceIcon className='back-icon' />
                <p>Back to home page</p>
            </Link>
            <Room roomInfo={roomInfo} />
            <div>
                calender
            </div>
        </div>
    )
}

export default RoomInfo;