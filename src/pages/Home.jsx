import HeaderHome from "../components/Home/HeaderHome";
import ListRoom from "../components/Home/ListRoom";
import ScheduleList from "../components/Home/ScheduleList";

const Home = () => {
    return (
        <div>
            <HeaderHome />
            <ListRoom />
            <ScheduleList />
        </div>
    );
}

export default Home;