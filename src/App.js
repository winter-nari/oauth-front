import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./component/page/sign/Login";
import Me from "./component/page/me/Me";
import Signup from './component/page/sign/Signup';
import Main from "./component/page/section/Main";
import CreateBoard from "./component/page/section/CreateBoard";
import AllBoard from './component/page/section/AllBoard';

// 인증 확인 함수
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
  // return !!sessionStorage.getItem('token');
};

// 인증 보호 컴포넌트
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/me" element={<PrivateRoute><Me /></PrivateRoute>} />
      <Route path="/new" element={<PrivateRoute><CreateBoard /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/me" />} />
      <Route path="/all" element={<PrivateRoute><AllBoard /> </PrivateRoute>} />
    </Routes>
  );
}

export default App;
