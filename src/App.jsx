
import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <HomePage />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>

    <Router>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </Router>

  );
}

export default App;