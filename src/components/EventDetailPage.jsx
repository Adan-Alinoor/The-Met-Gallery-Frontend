// import { useParams } from 'react-router-dom';
// import './EventDetailPage.css';

// const EventDetailPage = ({ events }) => {
//   const { eventId } = useParams();
//   const parsedEventId = parseInt(eventId);
//   console.log('Parsed Event ID:', parsedEventId);
//   console.log('Events:', events);
  
//   const event = events.find(event => event.id === parsedEventId);

//   if (!event) {
//     return <div>Event not found</div>;
//   }
 
//   return (
//     <div className="event-detail-page">
//       <h1>{event.name}</h1>
//       <img src={event.image} alt={event.name} className="event-image" />
//         <p>{event.details}</p>
//         <p><strong>Location:</strong> {event.location}</p>
//         <p><strong>Website:</strong> <a href={event.eventWebsite}>{event.eventWebsite}</a></p>
//         <p><strong>Start Time:</strong> {event.startTime}</p>
//         <p><strong>End Time:</strong> {event.endTime}</p>
//         <p><strong>Ticket Info:</strong> {event.ticketInfo}</p>
//       </div>
//     );
//   };
  
//   export default EventDetailPage;
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

  