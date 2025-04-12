import "./DateSelector.scss"

const DateSelector = ({ selectedDate, handleDateChange }) => {
    return (
        <input type="date" value={selectedDate} onChange={handleDateChange} className="date-selector" required />
    )
}

export default DateSelector;