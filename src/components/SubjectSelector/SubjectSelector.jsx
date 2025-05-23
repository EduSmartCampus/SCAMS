import "./SubjectSelector.scss"

const SubjectSelector = ({ handleSubjectChange, subject }) => {
    const subjects = [
      "Calculus 1",
      "Calculus 2",
      "English 1",
      "Physical 1",
      "Linear Algebra",
      "Software Engineer",
      "Advance Software Engineer",
      "Database Management",
      "Computer Architecture",
      "Data Structure and Algorithm",
      "Operating System",
      "Digital Systems",
      "Programming Fundamentals",
      "Principles of Programming Languages"
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
