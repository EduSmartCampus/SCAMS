import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import Setting from './pages/Setting';
import Login from './pages/Login';
import RoomInformation from './pages/RoomInformation';
import ScheduleRegistration from './components/ScheduleRegistration/ScheduleRegistration.jsx';
import UserInfo from './pages/UserInfo.jsx'
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/app/setting" element={<UserInfo />} />
          <Route path='/app/room/:id' element={<RoomInformation />} />
          <Route path='/app/schedule-registration/:id' element={<ScheduleRegistration />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
