import "./SideNav.scss";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const SideNav = () => {
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
