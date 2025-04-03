import './Layout.scss';
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import HeaderHome from '../components/Home/HeaderHome';

const Layout = () => {
  const location = useLocation();

  return (
    <main className="layout">
      <SideNav />
      <div className="outlet-container">
        {location.pathname === '/' && <HeaderHome />}
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;