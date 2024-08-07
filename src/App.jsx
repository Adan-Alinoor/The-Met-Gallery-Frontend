import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </Router>
  );
}

export default App;