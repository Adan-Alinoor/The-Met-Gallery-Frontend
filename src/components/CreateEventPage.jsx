import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEventPage.css';

const CreateEventPage = ({ addEvent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    eventName: '',
    eventDescription: '',
    location: '',
    eventWebsite: '',
    startTime: '',
    endTime: '',
    ticketInfo: '',
    ticketPrice: '',
    eventImage: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      ticketPrice: parseFloat(formData.ticketPrice),
    };
    addEvent(newEvent);
    navigate('/my-events');
  };

  return (
    <div className="create-event-page">
      <h1>Create Event</h1>
      <p>Complete the submission below. NB: Only Met Gallery-based events will be approved.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Event Name:
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />
        </label>
        <label>
          Event Description:
          <textarea name="eventDescription" value={formData.eventDescription} onChange={handleChange} required />
        </label>
        <label>
          Location (City and Ground Name):
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <label>
          Event Website:
          <input type="url" name="eventWebsite" value={formData.eventWebsite} onChange={handleChange} required />
        </label>
        <label>
          Start Time:
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </label>
        <label>
          End Time:
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </label>
        <label>
          Ticket Information:
          <input type="text" name="ticketInfo" value={formData.ticketInfo} onChange={handleChange} required />
        </label>
        <label>
          Ticket Price:
          <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} required />
        </label>
        <label>
          Event Image:
          <input type="file" name="eventImage" onChange={handleChange} required />
        </label>
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
