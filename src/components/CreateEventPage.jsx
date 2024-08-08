import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToEventsButton.css';
import './CreateEventPage.css';

const CreateEventPage = ({ addEvent }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: '',
    email: '',
    phone: '',
    eventName: '',
    eventDescription: '',
    location: '',
    eventWebsite: '',
    startTime: '',
    endTime: '',
    image: null,
    ticketInfo: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setEvent({
      ...event,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(event.endTime) <= new Date(event.startTime)) {
      setError('End time must be after start time.');
      return;
    }

    const formData = new FormData();
    for (const key in event) {
      formData.append(key, event[key]);
    }

    setIsSubmitting(true);
    setError('');

    try {
     
      await addEvent(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-event-page">
      <h1>Create Event</h1>
      <p>Complete the submission below. <br /> NB: “Only Met Gallery based events will be approved.”</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={event.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={event.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={event.phone} onChange={handleChange} required />
        <input type="text" name="eventName" placeholder="Event Name" value={event.eventName} onChange={handleChange} required />
        <textarea name="eventDescription" placeholder="Event Description" value={event.eventDescription} onChange={handleChange} required></textarea>
        <input type="text" name="location" placeholder="Location (City and Ground Name)" value={event.location} onChange={handleChange} required />
        <input type="url" name="eventWebsite" placeholder="Event Website" value={event.eventWebsite} onChange={handleChange} required />
        <input type="datetime-local" name="startTime" placeholder="Start Time" value={event.startTime} onChange={handleChange} required />
        <input type="datetime-local" name="endTime" placeholder="End Time" value={event.endTime} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleFileChange} required />
        <input type="text" name="ticketInfo" placeholder="Where clients can get the ticket" value={event.ticketInfo} onChange={handleChange} required />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Event'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <button className="back-to-events-button" onClick={() => navigate('/')}>
        Back to Events
      </button>
    </div>
  );
};

export default CreateEventPage;
