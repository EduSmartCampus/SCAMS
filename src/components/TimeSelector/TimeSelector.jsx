import "./TimeSelector.scss"

const TimeSelector = ({ startTime, endTime, setStartTime, setEndTime }) => {
    // Create an array of time options from 5 AM to 11 PM
    const timeOptions = [];
    for (let h = 7; h <= 22; h++) {
        const time = `${h.toString().padStart(2, '0')}:00`;
        timeOptions.push(time);
    }

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);

        const [hour] = newStartTime.split(":").map(Number);
        const nextHour = Math.min(hour + 1, 22);
        const nextTime = `${nextHour.toString().padStart(2, "0")}:00`;

        if (parseInt(endTime.split(":")[0]) <= hour) {
            setEndTime(nextTime);
        }
    };

    const handleEndTimeChange = (e) => {
        const newEndTime = e.target.value;
        setEndTime(newEndTime);
    };

    const handleDisableEndTime = ( time ) => {
        const startHours = parseInt(startTime.split(':')[0]);
        const recentHours = parseInt(time.split(':')[0]);
        return recentHours <= startHours;
    };

    return (
        <div className="time">
            <label>Start Time: </label>
            <select onChange={handleStartTimeChange} value={startTime} className="startTime">
                {timeOptions.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>

            <label>End Time: </label>
            <select onChange={handleEndTimeChange} value={endTime} className="endTime">
                {timeOptions.map((time) => (
                    <option key={time} value={time} disabled={handleDisableEndTime(time)}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TimeSelector;