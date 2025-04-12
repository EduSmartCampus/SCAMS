import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import Setting from './pages/Setting';
import Login from './pages/Login';
import RoomInformation from './pages/RoomInformation';
import ScheduleRegistration from './components/ScheduleRegistration/ScheduleRegistration.jsx';
import UserInfo from './pages/UserInfo.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/setting" element={<UserInfo />} />
          <Route path='/room/:id' element={<RoomInformation />} />
          <Route path='/schedule-registration/:id' element={<ScheduleRegistration />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
