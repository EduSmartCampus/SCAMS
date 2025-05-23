import './ScheduleInfo.scss'
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSchedule } from '../../context/ScheduleContext';

const ScheduleInfo = () => {
    const [isDelete, setIsDelete] = useState(false);
    const token = localStorage.getItem("authToken");
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    const { selectedEvent, toggleEdit, setSelectedEvent } = useSchedule();

    const handleDeleteSchedule = async () => {
        try {
            if (!window.confirm('Are you sure you want to delete this schedule?')) return;

            setIsDelete(true);

            const response = await axios.delete(`http://localhost:3000/schedules/${selectedEvent.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    teacherId: userInfo.id,
                },
            });

            if (response.status === 200) {
                toast.success("Delete successfully!")

                setTimeout(() => {
                    setSelectedEvent(null);
                    setIsDelete(false);
                    window.location.reload();
                }, 2000)
            }

            else {
                toast.error("Failed to delete!")
            }

        } catch (error) {
            toast.error("Something wrong that can not delete!")
        }
    }

  return (
    <div className="event-popup">
      <div className="popup-content">
        <button className="close-icon" onClick={() => setSelectedEvent(null)}>
          <CloseIcon className="icon" />
        </button>
        <h3>{selectedEvent.title}</h3>
        <p>{selectedEvent.room_name}</p>
        <p>
          Time:{" "}
          {selectedEvent.start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          -{" "}
          {selectedEvent.end.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>Lecturer name: {selectedEvent.lecturer_name}</p>
        {userInfo?.type === "lecturer" &&
          userInfo?.id === selectedEvent.lecturer_id && (
            <div className="btn-edit-delete">
              <button
                className="edit"
                onClick={toggleEdit}
              >
                <EditIcon className="icon" />
                <p>Edit</p>
              </button>
              <button className="delete" onClick={handleDeleteSchedule}>
                {isDelete ? (
                  <CircularProgress className="icon" size="16px" style={{'color': '#fff'}} />
                ) : (
                  <>
                    <ClearIcon className="icon" />
                    <p>Delete</p>
                  </>
                )}
              </button>
            </div>
          )}
      </div>
    </div>
  );
};


export default ScheduleInfo;