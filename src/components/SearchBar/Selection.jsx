const Selection = ({options, id}) => {
    return (
        <select name="" id={id}>
            {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
}

export default Selection;