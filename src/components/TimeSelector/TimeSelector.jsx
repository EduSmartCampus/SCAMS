import "./TimeSelector.scss"

const TimeSelector = ({ startTime, endTime, setStartTime, setEndTime }) => {
    // Create an array of time options from 5 AM to 11 PM
    const timeOptions = [];
    for (let h = 5; h <= 21; h++) {
        const time = `${h}:00`;
        timeOptions.push(time);
    }

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);
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