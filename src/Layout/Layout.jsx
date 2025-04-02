import './Layout.scss'
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import HeaderHome from '../components/Home/HeaderHome';

const Layout = () => {
    return (
        <main className="layout">
            <SideNav />
            <div className="outlet-container">
                <HeaderHome />
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;