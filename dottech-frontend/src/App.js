import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import StudentLogin from './Pages/StLogin';
import StudentRegister from './Pages/stRegister';
import TeacherLogin from './Pages/TcLogin';
import TeacherRegister from './Pages/TcRegister';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
