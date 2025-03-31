import './Room.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Room = ({name}) => {
    return (
        <div className='room'>
            <p className='room-name'>{name}</p>
            <button className='book'>
                <p>Book</p>
            </button>
        </div>
    );
}

export default Room;