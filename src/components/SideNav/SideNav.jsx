import "./SideNav.scss";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; // Icon for Room
import PersonIcon from '@mui/icons-material/Person'; // Icon for User

const SideNav = () => {
  // Retrieve userInfo from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const isLecturer = userInfo.type === "staff"; // Check if role is lecturer

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken"); // Optional: Clear authToken on logout
  };

  return (
      <div className="layout-nav">
        <div className="logo">
          SCAMS
        </div>
        <nav>
          <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "navChild active" : "navChild")}
          >
            <HomeIcon />
            <p>Home</p>
          </NavLink>
          <NavLink
              to="/setting"
              className={({ isActive }) => (isActive ? "navChild active" : "navChild")}
          >
            <SettingsIcon />
            <p>Setting</p>
          </NavLink>
          {/* Conditionally render Room and User links for lecturer role */}
          {isLecturer && (
              <>
                <NavLink
                    to="/room-edit"
                    className={({ isActive }) => (isActive ? "navChild active" : "navChild")}
                >
                  <MeetingRoomIcon />
                  <p>Room</p>
                </NavLink>
                <NavLink
                    to="/user"
                    className={({ isActive }) => (isActive ? "navChild active" : "navChild")}
                >
                  <PersonIcon />
                  <p>User</p>
                </NavLink>
              </>
          )}
          <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "navChild active" : "navChild")}
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