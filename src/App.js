import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./login/Login";
import Me from "./me/Me";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/me' element={<Me/>} />
    </Routes>
  );
}

export default App;