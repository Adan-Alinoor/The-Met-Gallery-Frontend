import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import EventDetailPage from './components/EventDetailPage';
import CreateEventPage from './components/CreateEventPage';
import TicketBookingPage from './components/TicketBookingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import MyEventsList from './components/MyEventsList';

const App = () => {
  const [events, setEvents] = useState([
    {  
      id: 1,
      name: 'Art Expo',
      details: 'An amazing art expo...',
      image: 'https://i.pinimg.com/564x/4d/7c/46/4d7c4673fdc622d124962b5ee7a146b5.jpg',
      location: 'City Ground',
      eventWebsite: 'https://www.eventbrite.com/',
      startTime: '2024-08-01T10:00',
      endTime: '2024-08-01T18:00',
      ticketPrice: 500 
    },
    {
      id: 2,
      name: 'Gallery Night',
      details: 'A wonderful gallery night...',
      image: 'https://i.pinimg.com/736x/d3/de/6d/d3de6d10d31e9f262a2a8391ae07a5b6.jpg',
      location: 'City Ground',
      eventWebsite: 'https://www.eventbrite.com/',
      startTime: '2024-08-01T20:00',
      endTime: '2024-08-01T22:00',
      ticketInfo: 'Tickets available at https://www.eventbrite.com/',
      ticketPrice: 800 
    }
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage events={events} />} />
        <Route path="/events" element={<EventsPage events={events} />} />
        <Route path="/events/:eventId" element={<EventDetailPage events={events} />} />
        <Route path="/create-event" element={<CreateEventPage addEvent={addEvent} />} />
        <Route path="/events/:eventId/book" element={<TicketBookingPage events={events} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my-events" element={<MyEventsList events={events} />} />
      </Routes>
    </Router>
  );
};

export default App;