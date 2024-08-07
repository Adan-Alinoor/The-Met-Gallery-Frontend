import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEventPage.css';

const CreateEventPage = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventName: '',
    eventDescription: '',
    location: '',
    eventWebsite: '',
    startTime: '',
    endTime: '',
    image: '',
    ticketInfo: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
    navigate('/events');
  };

  return (
    <div className="create-event-page">
      <h1>Create an Event</h1>
      <p>Complete the submission below</p>
      <p className="note">NB: Only Met Gallery based events will be approved.</p>
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
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
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
          Upload Image:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <label>
          Ticket Info:
          <textarea name="ticketInfo" value={formData.ticketInfo} onChange={handleChange} required />
        </label>
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;