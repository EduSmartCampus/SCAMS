import "./SubjectSelector.scss"

const SubjectSelector = ({ handleSubjectChange, subject }) => {
    const subjects = [
      "Calculus 1",
      "Calculus 2",
      "English 1",
      "Software Engineer",
      "Advance Software Engineer",
      "Database Management",
      "Computer Architecture",
      "Physical 1",
      "Data Structure and Algorithm",
      "Operating System",
    ];

  return (
    <select onChange={handleSubjectChange} value={subject} className="subject" required>
      {subjects.map((s) => (
        <option key={s} value={s} >
          {s}
        </option>
      ))}
    </select>
  );
};

export default SubjectSelector;
