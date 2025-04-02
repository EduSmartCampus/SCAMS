const Selection = ({ options, id, onChange }) => {
    return (
        <select id={id} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
}

export default Selection;