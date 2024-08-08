import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EventDetailPage.css'; // Assuming this file has the necessary styles

const EventDetailPage = ({ events }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === parseInt(eventId));

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="event-detail-page">
      <h1>{event.name}</h1>
      <img src={event.image} alt={event.name} />
      <p>{event.details}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Website:</strong> <a href={event.eventWebsite}>{event.eventWebsite}</a></p>
      <p><strong>Start Time:</strong> {event.startTime}</p>
      <p><strong>End Time:</strong> {event.endTime}</p>
      <p><strong>Ticket Info:</strong> {event.ticketInfo}</p>
      <Link to={`/events/${event.id}/book`}>
        <button>Book Now</button>
      </Link>
      <button className="back-to-events-button" onClick={() => navigate('/')}>
        Back to Events
      </button>
    </div>
  );
};

export default EventDetailPage;
