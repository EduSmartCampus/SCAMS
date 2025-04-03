import React, { useState, useEffect } from "react";
import "./ScheduleRegistration.scss";

const ScheduleRegistration = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://your-backend-url/rooms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setRooms(data);
        } else {
          setError("Failed to fetch rooms.");
        }
      } catch (err) {
        setError("An error occurred while fetching rooms.");
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const hourNum = parseInt(hour);
    if (hourNum < 5 || hourNum > 23) {
      setError("Hour must be between 5 AM and 11 PM.");
      return;
    }

    try {
      const response = await fetch(
        `http://your-backend-url/schedule?room_id=${roomId}&date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const scheduleData = await response.json();

      if (response.ok) {
        const slot = scheduleData.find((s) => s.hour === hourNum);
        if (slot && slot.occupied) {
          setError("This room is already booked at the selected time.");
          return;
        }
      } else {
        setError("Failed to check room availability.");
        return;
      }
    } catch (err) {
      setError("An error occurred while checking room availability.");
      return;
    }

    try {
      const bookingData = {
        room_id: parseInt(roomId),
        date: date,
        hour: hourNum,
        occupied: true,
        lecturer: user ? user.username : "Guest", 
        subject: subject,
      };

      const response = await fetch("http://your-backend-url/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSuccess(
          `Room booked successfully for ${subject} on ${date} at ${hour}:00!`
        );
      } else {
        setError("Failed to book the room. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="schedule-registration">
      <h2>Schedule Registration</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room: </label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_number}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hour (5 AM - 11 PM): </label>
          <input
            type="number"
            min="5"
            max="23"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject: </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Room</button>
      </form>
    </div>
  );
};

export default ScheduleRegistration;