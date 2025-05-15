import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import Setting from './pages/Setting';
import Login from './pages/Login';
import RoomInformation from './pages/RoomInformation';
import ScheduleRegistration from './components/ScheduleRegistration/ScheduleRegistration.jsx';
import UserInfo from './pages/UserInfo.jsx';
import LandingPage from './components/LandingPage/LandingPage';
import RoomEdit from './pages/RoomEdit.jsx';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/setting" element={<UserInfo />} />
          <Route path='/room/:id' element={<RoomInformation />} />
          <Route path='/schedule-registration/:id' element={<ScheduleRegistration />} />
            <Route path="/room-edit" element={<RoomEdit />} />
        </Route>
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
