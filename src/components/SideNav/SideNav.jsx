import "./SideNav.scss";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SideNav = () => {
  // Retrieve userInfo from localStorage
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  // const isStaff = userInfo.type === "staff"; // Check if role is staff
  const isLecturer = userInfo?.type === "lecturer";

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
  };

  return (
    <div className="layout-nav">
      <div className="logo">SCAMS</div>
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "navChild active" : "navChild"
          }
        >
          <HomeIcon />
          <p>Home</p>
        </NavLink>
        {userInfo && <NavLink
          to="/setting"
          className={({ isActive }) =>
            isActive ? "navChild active" : "navChild"
          }
        >
          <SettingsIcon />
          <p>Setting</p>
        </NavLink>}
        {/* Conditionally render Room and User links for lecturer role */}
        {/* {isStaff && (
          <NavLink
            to="/room-edit"
            className={({ isActive }) =>
              isActive ? "navChild active" : "navChild"
            }
          >
            <MeetingRoomIcon />
            <p>Room</p>
          </NavLink>
        )} */}
        {isLecturer && (
          <NavLink
            to={`/schedule/${userInfo.id}`}
            className={({ isActive }) =>
              isActive ? "navChild active" : "navChild"
            }
          >
            <CalendarMonthIcon />
            <p>Lecturer Schedule</p>
          </NavLink>
        )}
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "navChild active" : "navChild"
          }
          onClick={handleLogout}
        >
          <LogoutIcon />
          <p>Logout</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideNav;
