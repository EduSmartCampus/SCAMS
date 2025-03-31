import './Layout.scss'
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";

const Layout = () => {
    return (
        <main className="layout">
            <SideNav />
            <div className="outlet-container">
                <Outlet />
            </div>
        </main>
    );
}

export default Layout;