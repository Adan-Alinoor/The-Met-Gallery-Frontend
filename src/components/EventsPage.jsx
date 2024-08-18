// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './EventsPage.css';
// import EventsNavbar from './EventsNavbar';


// const EventsPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   console.log(events.length);

  
//     const fetchEvents = async () => {
//       const session = JSON.parse(localStorage.getItem('session'));
//       const token=session && session.accessToken
//       console.log('Retrieved token:', token);
      

//       if (!token) {
//         navigate('/');
//         return;
//       }

//       try {
//         const response = await fetch('http://127.0.0.1:5555/events', {
//           headers: {
//             "METHOD": "GET",
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           console.log('Response status:', response.status);
//           if (response.status === 401) {
//             navigate('/');
//           } else {
//             throw new Error('Failed to fetch events');
//           }
//         }

//         const data = await response.json();
      
//         setEvents(data);
       
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching events:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     useEffect(() => {
//       fetchEvents();
//     }, [navigate]); 

//   const filteredevents = events.filter(event =>
//     event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="events-page">
//       <div>
//         <EventsNavbar/>
//       </div>
//       <div className="header">
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search events..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
        
//       </div>
     
//       <div className="events-list">
//         {loading && <p>Loading events...</p>}
//         {error && <p>{error}</p>}
//         {events.length > 0 ? (
//           events.map(event => (
//             <div key={event.id} className="event-card">
//               <img src={event.image_url} alt={event.name} className="event-image" />
//               <div className="event-details">
//                 <h3 className="event-title">{event.name}</h3>
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
import { Link, useNavigate } from 'react-router-dom';
import './EventsPage.css';
import EventsNavbar from './EventsNavbar';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(events.length);

  const fetchEvents = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session && session.accessToken;
    console.log('Retrieved token:', token);

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5555/events', {
        headers: {
          'METHOD': 'GET',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log('Response status:', response.status);
        if (response.status === 401) {
          navigate('/');
        } else {
          throw new Error('Failed to fetch events');
        }
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
  }, [navigate]);

  const filteredevents = events.filter(event =>
    event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="events-page">
      <div>
        <EventsNavbar />
      </div>
      <div className="header">
        <input
          type="text"
          className="search-bar"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="events-list">
        {loading && <p>Loading events...</p>}
        {error && <p>{error}</p>}
        {filteredevents.length > 0 ? (
          filteredevents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image_url} alt={event.title} className="event-image" />
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3> {/* Display the event title */}
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
