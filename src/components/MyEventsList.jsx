import { Link } from 'react-router-dom';
import './MyEventsList.css';

const MyEventsList = ({ events }) => {
  return (
    <div className="my-events-list">
      <h1>My Events List</h1>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <h2>{event.eventName}</h2>
            <p>{event.eventDescription}</p>
            <Link to={'/events/${event.id}'}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEventsList;