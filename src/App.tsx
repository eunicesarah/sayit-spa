import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

import Consultation from './pages/Consultation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Chat from './pages/Chat';
import Report from './pages/Report';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  return (
    <div className="App">
      {!isLoginPage && !isRegisterPage && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/chat/:psychologistId" element={<Chat />} />
      </Routes>
      {/* {!isLoginPage && !isRegisterPage && <Footer />} */}
    </div>
  );
}

export default App;
