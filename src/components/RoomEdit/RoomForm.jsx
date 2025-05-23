import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import './RoomForm.scss';

const RoomForm = ({ roomToEdit, onSave, onCancel }) => {
    const isEditing = !!roomToEdit;
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        _id: roomToEdit?._id || '',
        roomName: roomToEdit?.name || '',
        building: roomToEdit?.building || '',
        roomNumber: roomToEdit?.room_number || '',
        capacity: roomToEdit?.capacity || '',
        devices: roomToEdit?.devices?.join(',') || '',
        corridor_id: roomToEdit?.corridor_id || '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            toast.error('Please fill in all required fields.');
            return;
        }

        const devicesArray = formData.devices.split(',').map((d) => d.trim()).filter((d) => d);
        const payload = {
            _id: formData._id,
            roomName: formData.roomName,
            building: formData.building,
            roomNumber: parseInt(formData.roomNumber, 10),
            capacity: parseInt(formData.capacity, 10),
            devices: devicesArray,
            corridor_id: formData.corridor_id,
        };

        setLoading(true);
        try {
            const url = isEditing
                ? `http://localhost:3000/room/${roomToEdit._id}`
                : 'http://localhost:3000/room';
            const method = isEditing ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success(isEditing ? 'Room updated successfully!' : 'Room created successfully!');
                onSave();
            } else {
                const data = await response.json();
                toast.error(data.message || `Failed to ${isEditing ? 'update' : 'create'} room.`);
            }
        } catch (err) {
            toast.error('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="room-form">
            <form ref={formRef}>
                <h1 className="form-header">{isEditing ? 'Edit Room' : 'Create New Room'}</h1>
                <input
                    type="text"
                    name="_id"
                    placeholder="Room ID (e.g., ROOM_B1_101)"
                    value={formData._id}
                    onChange={handleChange}
                    required
                    disabled={isEditing}
                />
                <input
                    type="text"
                    name="roomName"
                    placeholder="Room Name"
                    value={formData.roomName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="building"
                    placeholder="Building (e.g., B1)"
                    value={formData.building}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="roomNumber"
                    placeholder="Room Number"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="devices"
                    placeholder="Devices (comma-separated, e.g., lamp, projector)"
                    value={formData.devices}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="corridor_id"
                    placeholder="Corridor ID (e.g., CORRIDOR_B1_1)"
                    value={formData.corridor_id}
                    onChange={handleChange}
                />
                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel} disabled={loading}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoomForm;