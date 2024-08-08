import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyEventsList.css';
import './BackToEventsButton.css';

const MyEventsList = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="my-events-list">
      <h1>My Events List</h1>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-item">
            <h2>{event.eventName}</h2>
            <p>{event.eventDescription}</p>
            <Link to={`/events/${event.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
      <button className="back-to-events-button" onClick={() => navigate('/')}>
        Back to Events
      </button>
    </div>
  );
};

export default MyEventsList;
