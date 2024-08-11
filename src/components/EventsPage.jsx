// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './EventsPage.css';

// const EventsPage = ({ events }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const filteredEvents = events.filter(event =>
//     event.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="events-page">
//       <div className="header">
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search events..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div className="auth-buttons">
//           <Link to="/login" className="auth-button">Login</Link>
//           <Link to="/signup" className="auth-button">Sign Up</Link>
//         </div>
//       </div>
//       <div className="event-controls">
//         <Link to="/create-event" className="create-event-button">Create Event</Link>
//         <Link to="/my-events" className="my-events-button">My Events List</Link>
//       </div>
//       <div className="events-list">
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map(event => (
//             <div key={event.id} className="event-card">
//               <img src={event.image} alt={event.name} className="event-image" />
//               <div className="event-details">
//                 <h3 className="event-title">{event.name}</h3>
//                 <p className="event-description">{event.details}</p>
//                 <div className="event-actions">
//                   <Link to={`/events/${event.id}`} className="details-link">View Details</Link>
//                   <button
//                     className="booking-button"
//                     onClick={() => navigate(`/events/${event.id}/book`)}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No events found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsPage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EventsPage.css';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      console.log('Token:', token); // Debugging: Check if the token is correctly retrieved

      if (!token) {
        setError('Authorization token is missing. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5555/events', {
          headers: {
            'Authorization': `Bearer ${token}` // Add the token to the headers
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token or session expired. Please log in again.');
          } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        }

        const data = await response.json();
        setEvents(data || []);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents(); // Call the fetchEvents function on component mount
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="events-page">
      <div className="header">
        <input
          type="text"
          className="search-bar"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/signup" className="auth-button">Sign Up</Link>
        </div>
      </div>
      <div className="event-controls">
        <Link to="/create-event" className="create-event-button">Create Event</Link>
        <Link to="/my-events" className="my-events-button">My Events List</Link>
      </div>
      <div className="events-list">
        {loading && <p>Loading events...</p>}
        {error && <p>{error}</p>}
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.name} className="event-image" />
              <div className="event-details">
                <h3 className="event-title">{event.name}</h3>
                <p className="event-description">{event.details}</p>
                <div className="event-actions">
                  <Link to={`/events/${event.id}`} className="details-link">View Details</Link>
                  <button
                    className="booking-button"
                    onClick={() => navigate(`/events/${event.id}/book`)}
                  >
                    Book Now
                  </button>
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


