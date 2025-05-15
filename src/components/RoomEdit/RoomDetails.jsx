import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './RoomDetails.scss';

const RoomDetails = ({ roomId, onBack }) => {
    const [room, setRoom] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRoomDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/room/${roomId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setRoom(data.room);
                setSchedules(data.schedules);
            } else {
                toast.error('Failed to fetch room details.');
            }
        } catch (err) {
            toast.error('Error fetching room details: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    return (
        <div className="room-details-container">
            <div className="details-header">
                <h2>Room Details</h2>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : !room ? (
                <p>Room information not found.</p>
            ) : (
                <>
                    <div className="room-info">
                        <p><strong>Room Name:</strong> {room.name}</p>
                        <p><strong>Building:</strong> {room.building}</p>
                        <p><strong>Room Number:</strong> {room.room_number}</p>
                        <p><strong>Capacity:</strong> {room.capacity}</p>
                        <p><strong>Devices:</strong> {room.devices.join(', ')}</p>
                        <p><strong>Corridor ID:</strong> {room.corridor_id}</p>
                    </div>

                    <div className="schedules-section">
                        <h3>Usage Schedule</h3>
                        {schedules.length === 0 ? (
                            <p className="no-schedules">No usage schedules available.</p>
                        ) : (
                            <ul className="schedule-list">
                                {schedules.map((schedule, index) => (
                                    <li key={index} className="schedule-item">
                                        <strong>Date:</strong> {schedule.date},{' '}
                                        <strong>Period:</strong> {schedule.startPeriod} - {schedule.endPeriod},{' '}
                                        <strong>Teacher:</strong> {schedule.teacherId},{' '}
                                        <strong>Subject:</strong> {schedule.lectureTitle}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className="back-button" onClick={onBack}>
                        Back to List
                    </button>
                </>
            )}
        </div>
    );
};

export default RoomDetails;