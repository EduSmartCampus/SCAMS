import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoomList from '../components/RoomEdit/RoomList.jsx';
import RoomForm from '../components/RoomEdit/RoomForm.jsx';
import RoomDetails from '../components/RoomEdit/RoomDetails.jsx';
import './RoomEdit.scss';

const RoomEdit = () => {
    const [view, setView] = useState('list');
    const [roomToEdit, setRoomToEdit] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const handleEdit = (room) => {
        setRoomToEdit(room);
        setView('form');
    };

    const handleCreate = () => {
        setRoomToEdit(null);
        setView('form');
    };

    const handleViewDetails = (roomId) => {
        setSelectedRoomId(roomId);
        setView('details');
    };

    const handleSave = () => {
        setView('list');
        setRoomToEdit(null);
    };

    const handleCancel = () => {
        setView('list');
        setRoomToEdit(null);
    };

    const handleBack = () => {
        setView('list');
        setSelectedRoomId(null);
    };

    return (
        <div className="room-management">
            <ToastContainer />
            <div className="management-header">
                <h1>Classroom Management</h1>
                {view === 'list' && (
                    <button className="create-button" onClick={handleCreate}>
                        <span>+</span> Create New Room
                    </button>
                )}
            </div>

            {view === 'list' && (
                <RoomList onEdit={handleEdit} onViewDetails={handleViewDetails} />
            )}
            {view === 'form' && (
                <RoomForm
                    roomToEdit={roomToEdit}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            {view === 'details' && (
                <RoomDetails roomId={selectedRoomId} onBack={handleBack} />
            )}
        </div>
    );
};

export default RoomEdit;