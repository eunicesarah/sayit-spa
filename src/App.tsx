import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Consultation from './pages/Consultation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/History" element={<History />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/chat/:psychologistId" element ={<Chat/>} />
      
    </Routes>
    </div>
  );
}

export default App;
