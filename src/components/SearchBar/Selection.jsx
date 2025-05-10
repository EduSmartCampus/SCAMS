const Selection = ({ options, id, value, onChange }) => {
    return (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
}

export default Selection;