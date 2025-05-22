import ListScheduleLecturer from "../components/ListScheduleLecturer/ListScheduleLecturer";
import './LecturerSchedule.scss'

const LecturerSchedule = () => {
    return (
        <div className="schedule">
            <h1>Lecturer Schedule</h1>
            <ListScheduleLecturer />
        </div>
    )
}

export default LecturerSchedule;