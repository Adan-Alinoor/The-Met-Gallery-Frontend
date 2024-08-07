import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import CreateEventPage from './components/CreateEventPage';
import LoginPage from './components/LoginPage'; // Cindy
import SignupPage from './components/SignupPage'; // Cindy

function App() {
  const [events, setEvents] = useState([
    { id: 1, name: 'Art Expo', details: 'An amazing art expo...', image: 'https://i.pinimg.com/564x/a9/af/9c/a9af9c55a1dda2f048a3e15311e14b75.jpg' },
    { id: 2, name: 'Gallery Night', details: 'A wonderful gallery night...', image: 'https://i.pinimg.com/564x/6c/b8/e4/6cb8e40714a7ab4d208b11c55cdc1f9b.jpg' },
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/events" element={<EventsPage events={events} />} />
        <Route path="/create-event" element={<CreateEventPage addEvent={addEvent} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<EventsPage events={events} />} />
      </Routes>
    </Router>
  );
}

export default App;