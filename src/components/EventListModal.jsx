import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './EventListModal.css'; // Import the external CSS

const EventEditModal = ({ show, onHide, eventId, onUpdate }) => {
  const [event, setEvent] = useState({
    title: '',
    image_url: '',
    description: '',
    start_date: '',
    end_date: '',
    time: '',
    location: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const session = JSON.parse(localStorage.getItem('session'));
          const token = session && session.accessToken;

          const response = await axios.get(`https://the-met-gallery-backend.onrender.com/events/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setEvent(response.data);
        } catch (error) {
          setError('Error fetching event details.');
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session && session.accessToken;

    try {
      await axios.put(`https://the-met-gallery-backend.onrender.com/events/${eventId}`, event, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate();
      onHide();
    } catch (error) {
      setError('Error updating event.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="event-edit-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={event.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image_url"
              value={event.image_url}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={event.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={event.start_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={event.end_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={event.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            className="save-button"
            type="submit"
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventEditModal;
