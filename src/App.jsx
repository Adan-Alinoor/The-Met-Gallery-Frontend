import React, { useState } from 'react';
import Dashboard from './components/Dashboard'
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

    {/* Protected Routes */}
    <Route
      path="/home"
      element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
    />
    <Route
      path="/profile"
      element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />}
    />

    <Route
      path="/dashboard"
      element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
    />

    {/* Redirect all other paths to the login page */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>    
  )
}

export default App;
