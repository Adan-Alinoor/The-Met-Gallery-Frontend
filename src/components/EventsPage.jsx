import React from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';

const EventsPage = ({ events }) => {
  return (
    <div className="events-page">
      <div className="header">
        <input type="text" className="search-bar" placeholder="Search events..." />
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/signup" className="auth-button">Sign Up</Link>
        </div>
      </div>
      <ul className="events-list">
        {events.map(event => (
          <li key={event.id} className="event-item">
            <img src={event.image} alt={event.name} className="event-image" />
            <h3>{event.name}</h3>
            <p>{event.details}</p>
            <Link to={'/events/${event.id}'} className="details-link">View Details</Link>
            <Link to={'/events/${event.id}/book'} className="booking-button">Book Now</Link>
          </li>
        ))}
      </ul>
      <Link to="/create-event" className="create-event-button">Create an Event</Link>
    </div>
  );
};

export default EventsPage;