import './Layout.scss';
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import ScheduleRegistration from '../components/ScheduleRegistration/ScheduleRegistration';
import { useSchedule } from '../context/ScheduleContext';
import ScheduleInfo from '../components/RoomInformation/ScheduleInfo';
import EditSchedule from '../components/RoomInformation/EditSchedule';

const Layout = () => {  
  const { isScheduleOpen, isEdit, selectedEvent } = useSchedule();

  return (
    <main className="layout">
      <SideNav />
      <div className="outlet-container">
        <Outlet />
      </div>
      {isScheduleOpen && <ScheduleRegistration />}
      {selectedEvent && <ScheduleInfo />}
      {isEdit && <EditSchedule />}
    </main>
  );
};

export default Layout;