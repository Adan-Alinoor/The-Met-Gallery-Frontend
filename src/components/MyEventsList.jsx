import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyEventsList.css';
import './BackToEventsButton.css';
import EventsNavbar from './EventsNavbar';
import EventEditModal from './EventListModal';

const MyEventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        const token = session?.accessToken;
        const userId = session?.user?.id;

        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://127.0.0.1:5555/events?user_specific=true', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setEvents([]);
        }
      } catch (error) {
        setError('Error fetching events.');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleDelete = async (eventId) => {
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session?.accessToken;

      if (!token) {
        navigate('/login');
        return;
      }

      await axios.delete(`http://127.0.0.1:5555/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      setError('Error deleting event.');
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEventId(null);
  };

  const handleUpdate = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session?.accessToken;

      const response = await axios.get('http://127.0.0.1:5555/events?user_specific=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setEvents([]);
      }
    } catch (error) {
      setError('Error fetching events.');
      console.error('Error fetching events:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-events-list">
      <EventsNavbar />
      <h1>My Events List</h1>
      {events.length === 0 ? (
        <div className="no-events-message">
          <p>You have no events yet. Create your first event!</p>
          <Link to="/create-event">
            <button className="create-event-button">Create Event</button>
          </Link>
        </div>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <img src={event.image_url} alt={event.title} />
              <h4>Name: {event.title}</h4>
              <button onClick={() => handleEdit(event.id)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(event.id)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="back-to-events-button" onClick={() => navigate("/")}>
        Back to Events
      </button>

      <EventEditModal
        show={showModal}
        onHide={handleModalClose}
        eventId={selectedEventId}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default MyEventsList;