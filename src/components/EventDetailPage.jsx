import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EventDetailPage.css'; 

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  // const event = events.find(e => e.id === parseInt(id));

  const [event, setEvent]=useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchEvent = async () => {
  const session = JSON.parse(localStorage.getItem('session'));
  const token=session && session.accessToken
  console.log('Retrieved token:', token);
  

  if (!token) {
    navigate('/');
    return;
  }

    try {
      const response = await fetch(`http://127.0.0.1:5555/events/${eventId}`, {
        headers: {
          "METHOD": "GET",
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
    
      setEvent(data);
     
    } catch (error) {
      setError(error.message);
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, [navigate]); 
  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="event-detail-page">
      <h1>{event.title}</h1>
      <img src={event.image_url} alt={event.name} />
      <p>{event.details}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong>{event.description}</p>
      <p><strong>Start Time:</strong> {event.start_date}</p>
      <p><strong>End Time:</strong> {event.end_date}</p>
      <p><strong>Ticket Info:</strong></p>
      {event.tickets.map((ticket) => (
        <p key={ticket.id}>{ticket.type_name} @ KSh.{ticket.price}</p>
      ))}
      <Link to={`/events/${event.title}/${event.id}/book`}>
        <button>Book Now</button>
      </Link>
      <button className="back-to-events-button" onClick={() => navigate('/events')}>
        Back to Events
      </button>
    </div>
  );
};

export default EventDetailPage;
