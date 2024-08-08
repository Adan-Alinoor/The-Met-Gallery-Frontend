import { useParams, Link } from 'react-router-dom';
import './EventDetailPage.css';

const EventDetailPage = ({ events }) => {
  const { eventId } = useParams();
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
      <Link to={'/events/${event.id}/book'}>
        <button>Book Now</button>
      </Link>
    </div>
  );
};

export default EventDetailPage;

  