const Selection = ({ options, id, value, onChange }) => {
    return (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option, index) => (
                <option key={option._id || index} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
}

export default Selection;