import "./DateSelector.scss"

const DateSelector = ({ selectedDate, handleDateChange, minDate }) => {
    return (
        <input type="date" value={selectedDate} onChange={handleDateChange} min={minDate} className="date-selector" required />
    )
}

export default DateSelector;