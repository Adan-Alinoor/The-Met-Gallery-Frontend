import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from './components/EventsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/events" element={<EventsPage />} />
        {/* Default route when frontend is done */}
        <Route path="*" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;