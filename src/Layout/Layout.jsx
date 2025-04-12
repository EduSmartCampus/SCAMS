import './Layout.scss';
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import ScheduleRegistration from '../components/ScheduleRegistration/ScheduleRegistration';
import { useSchedule } from '../context/ScheduleContext';

const Layout = () => {  
  const { isScheduleOpen } = useSchedule();

  return (
    <main className="layout">
      <SideNav />
      <div className="outlet-container">
        <Outlet />
      </div>
      {isScheduleOpen && <ScheduleRegistration />}
    </main>
  );
};

export default Layout;