// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './EventsPage.css';
// import EventsNavbar from './EventsNavbar';
// import SearchEvent from './SearchEvent';

// const EventsPage = () => {
//   const [searchEvent, setSearchEvent] = useState('');
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   console.log(events.length);

//   const fetchEvents = async () => {
//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session && session.accessToken;
//     console.log('Retrieved token:', token);

//     if (!token) {
//       navigate('/');
//       return;
//     }

//     try {
//       const response = await fetch('https://the-met-gallery-backend.onrender.com/events', {
//         headers: {
//           'METHOD': 'GET',
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         console.log('Response status:', response.status);
//         if (response.status === 401) {
//           navigate('/');
//         } else {
//           throw new Error('Failed to fetch events');
//         }
//       }

//       const data = await response.json();
//       setEvents(data);

//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, [navigate]);

//   const filteredEvents = events.filter(event =>
//     event.title && event.title.toLowerCase().includes(searchEvent.toLowerCase())
//   );


//   return (
//     <div className="events-page">
//       <div>
//         <EventsNavbar />
//       </div>
//       <div>
//       <SearchEvent searchEvent={searchEvent} setSearchEvent={setSearchEvent}/>

//       </div>
//       <div className="events-list">
//         {loading && <p>Loading events...</p>}
//         {error && <p>{error}</p>}
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map(event => (
//             <div key={event.id} className="event-card">
//               <img src={event.image_url} alt={event.title} className="event-image" />
//               <div className="event-details">
//                 <h3 className="event-title">{event.title}</h3> {/* Display the event title */}
//                 <p className="event-description">{event.details}</p>
//                 <div className="event-actions">
//                   <Link to={`/events/${event.id}`} className="details-link">View Details</Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && <p>No events found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsPage;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import EventsNavbar from './EventsNavbar';
import SearchEvent from './SearchEvent';

const EventsPage = () => {
  const [searchEvent, setSearchEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://the-met-gallery-backend.onrender.com/events');

      if (!response.ok) {
        console.log('Response status:', response.status);
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);

    } catch (error) {
      setError(error.message);
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title && event.title.toLowerCase().includes(searchEvent.toLowerCase())
  );

  return (
    <div className="events-page">
      <div>
        <EventsNavbar />
      </div>
      <div>
        <SearchEvent searchEvent={searchEvent} setSearchEvent={setSearchEvent}/>
      </div>
      <div className="events-list">
        {loading && <p>Loading events...</p>}
        {error && <p>{error}</p>}
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image_url} alt={event.title} className="event-image" />
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.details}</p>
                <div className="event-actions">
                  <Link to={`/events/${event.id}`} className="details-link">View Details</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;



