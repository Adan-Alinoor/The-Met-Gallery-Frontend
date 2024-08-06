import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';

const EventsPage = () => {
  // ASK group --fetch from the backend
  const [events] = useState([
    {
      id: 1,
      title: "Art Exhibition",
      date: "2024-09-15",
      location: "Gallery Hall, NY",
      description: "An exciting art exhibition featuring modern and contemporary artworks.",
      imageUrl: "https://i.pinimg.com/564x/a9/af/9c/a9af9c55a1dda2f048a3e15311e14b75.jpg"
    },
    {
      id: 2,
      title: "Art Workshop",
      date: "2024-10-01",
      location: "Art Studio, NY",
      description: "A hands-on workshop for aspiring artists to learn new techniques.",
      imageUrl: "https://i.pinimg.com/564x/b5/31/c0/b531c0abacc3b30321614d9bb541872e.jpg"
    }
  ]);

  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="events-page">
     
      <header className="header">
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/signup" className="auth-button">Signup</Link>
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </header>
      <main>
        <h1>Upcoming Events</h1>
        <ul className="events-list">
          {filteredEvents.map(event => (
            <li key={event.id} className="event-item">
              <img src={event.imageUrl} alt={event.title} className="event-image" />
              <h2>{event.title}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
              <Link to={`/events/${event.id}`} className="details-link">View Details</Link>
              <Link to={`/events/${event.id}`} className="booking-button">Book Now</Link>
            </li>
          ))}
        </ul>
        <button className="create-event-button">Create an Event</button>
      </main>
    </div>
  );
};

export default EventsPage;
