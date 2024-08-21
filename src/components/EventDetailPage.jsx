// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import './EventDetailPage.css'; 
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

// const EventDetailPage = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchEvent = async () => {
//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session?.accessToken;

//     if (!token) {
//       navigate('/');
//       return;
//     }

//     try {
//       const response = await fetch(`https://the-met-gallery-backend.onrender.com/events/${eventId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         console.log('Response status:', response.status);
//         if (response.status === 401) {
//           navigate('/');
//         } else {
//           throw new Error('Failed to fetch event');
//         }
//       }

//       const data = await response.json();
//       setEvent(data);
//     } catch (error) {
//       setError(error.message);
//       console.error('Error fetching event:', error);
//       // Display error using react-toastify
//       toast.error(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvent();
//   }, [eventId, navigate]); // Ensure `eventId` is included in dependencies

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!event) {
//     return <p>Event not found</p>;
//   }

//   return (
//     <div className="event-detail-page">
//       <h1>{event.title}</h1>
//       <img src={event.image_url} alt={event.title} />
//       <p><strong>Location:</strong> {event.location || 'No location provided'}</p>
//       <p><strong>Description:</strong> {event.description || 'No description available'}</p>
//       <p><strong>Start Time:</strong> {event.start_date || 'No start date provided'}</p>
//       <p><strong>End Time:</strong> {event.end_date || 'No end date provided'}</p>
//       <p><strong>Ticket Info:</strong></p>
//       {event.tickets && event.tickets.length > 0 ? (
//         <table className="ticket-table">
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Price</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {event.tickets.map((ticket) => (
//               <tr key={ticket.id}>
//                 <td>{ticket.type_name || 'Unknown'}</td>
//                 <td>KSh {ticket.price || 'N/A'}</td>
//                 <td>{ticket.quantity || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No tickets available</p>
//       )}
//       <div className="button-container">
//         <Link to={`/events/${event.title}/${event.id}/book`}>
//           <button className="back-to-events-button">Book Now</button>
//         </Link>
//         <button className="back-to-events-button" onClick={() => navigate('/events')}>
//           Back to Events
//         </button>
//       </div>
//       <ToastContainer /> {/* Include ToastContainer to render the toasts */}
//     </div>
//   );
// };

// export default EventDetailPage;


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EventDetailPage.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`https://the-met-gallery-backend.onrender.com/events/${eventId}`);

      if (!response.ok) {
        console.log('Response status:', response.status);
        throw new Error('Failed to fetch event');
      }

      const data = await response.json();
      setEvent(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching event:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId, navigate]);

  const handleBookNowClick = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    if (!token) {
      toast.info("Please log in to book tickets.");
      navigate('/login');  // Redirect to login page
    } else {
      navigate(`/events/${event.title}/${event.id}/book`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="event-detail-page">
      <h1>{event.title}</h1>
      <img src={event.image_url} alt={event.title} />
      <p><strong>Location:</strong> {event.location || 'No location provided'}</p>
      <p><strong>Description:</strong> {event.description || 'No description available'}</p>
      <p><strong>Start Time:</strong> {event.start_date || 'No start date provided'}</p>
      <p><strong>End Time:</strong> {event.end_date || 'No end date provided'}</p>
      <p><strong>Ticket Info:</strong></p>
      {event.tickets && event.tickets.length > 0 ? (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {event.tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.type_name || 'Unknown'}</td>
                <td>KSh {ticket.price || 'N/A'}</td>
                <td>{ticket.quantity || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tickets available</p>
      )}
      <div className="button-container">
        <button className="back-to-events-button" onClick={handleBookNowClick}>
          Book Now
        </button>
        <button className="back-to-events-button" onClick={() => navigate('/events')}>
          Back to Events
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventDetailPage;

