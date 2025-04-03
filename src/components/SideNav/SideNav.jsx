import "./SideNav.scss";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';

const SideNav = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="layout-nav">
      <div className="logo">
        SCAMS
      </div>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "navChild active" : "navChild"}>
          <HomeIcon />
          <p>Home</p>
        </NavLink>
        <NavLink to="/schedule-registration" className={({ isActive }) => isActive ? "navChild active" : "navChild"}>
          <EventIcon />
          <p>Register</p>
        </NavLink>
        <NavLink to="/setting" className={({ isActive }) => isActive ? "navChild active" : "navChild"}>
          <SettingsIcon />
          <p>Setting</p>
        </NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "navChild active" : "navChild"}>
          <LogoutIcon />
          <p>Logout</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideNav;