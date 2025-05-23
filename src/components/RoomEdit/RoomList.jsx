import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './RoomList.scss';

const RoomList = ({ onEdit, onViewDetails }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('You need to log in to view the room list.');
            }
            const response = await fetch('http://localhost:3000/room', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setRooms(data);
            } else if (response.status === 401) {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to load room list.');
            }
        } catch (err) {
            console.error('Error fetching rooms:', err);
            toast.error(err.message || 'Error loading room list.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (roomId) => {
        if (!window.confirm('Are you sure you want to delete this room?')) return;

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error('Please log in to delete the room.');
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/room/${roomId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
            if (response.ok) {
                toast.success('Room deleted successfully!');
                await fetchRooms();
            } else {
                if (response.status === 403) {
                    toast.error('You do not have permission to delete the room. Please log in with a staff account.');
                } else if (response.status === 401) {
                    toast.error('Session expired. Please log in again.');
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                } else {
                    toast.error(responseData.message || 'Failed to delete room.');
                }
            }
        } catch (err) {
            console.error('Error deleting room:', err);
            toast.error('Error deleting room: ' + err.message);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="room-list-container">
            <div className="list-header">
                <h2>Room List</h2>
            </div>

            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : rooms.length === 0 ? (
                <p className="empty-message">No rooms available.</p>
            ) : (
                <ul className="room-items">
                    {rooms.map((room) => (
                        <li key={room._id} className="room-item">
                            <div className="room-info">
                                {room.name} (Building: {room.building}, Room: {room.room_number})
                            </div>
                            <div className="room-actions">
                                <button onClick={() => onViewDetails(room._id)}>View Details</button>
                                <button onClick={() => onEdit(room)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(room._id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoomList;