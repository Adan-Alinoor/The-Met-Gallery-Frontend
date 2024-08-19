import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Card } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventEditModal from "../EventListModal";
import { FaList, FaTh } from "react-icons/fa";
import "./EventManagement.css"; // Import the CSS file

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [action, setAction] = useState("Add");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
  const [searchQuery, setSearchQuery] = useState("");

  const handleCloseAdd = () => setShowAddModal(false);
  const handleShowAdd = () => setShowAddModal(true);

  const handleCloseUpdate = () => setShowUpdateModal(false);
  const handleShowUpdate = () => setShowUpdateModal(true);

  const handleCloseDetails = () => setShowDetailsModal(false);
  const handleShowDetails = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const fetchEvents = async () => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    try {
      const response = await axios.get("http://localhost:5555/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedEvents = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setEvents(sortedEvents);
    } catch (error) {
      toast.error("Error fetching events.");
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    const newEvent = {
      title: event.target.title.value,
      description: event.target.description.value,
      image_url: event.target.image_url.value,
      start_date: event.target.start_date.value,
      end_date: event.target.end_date.value,
      time: event.target.time.value,
      location: event.target.location.value,
    };

    try {
      await axios.post("http://localhost:5555/events", newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Event added successfully!");
      fetchEvents();
      handleCloseAdd();
    } catch (error) {
      toast.error("Error adding event.");
      console.error("Error adding event:", error);
    }
  };

  const handleDelete = async (eventId) => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    try {
      await axios.delete(`http://localhost:5555/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Event deleted successfully!");
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      toast.error("Error deleting event.");
      console.error("Error deleting event:", error);
    }
  };

  const handleEditClick = async (eventId) => {
    setAction("Edit");
    setSelectedEventId(eventId);
    handleShowUpdate();
  };

  const getPaginatedEvents = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return events.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          className={`pagination-button ${
            i === currentPage ? "active-page" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="event-management-container">
      <Card className="controls-card">
        <Card.Body>
          <Button className="add-button" onClick={handleShowAdd}>
            Add Event
          </Button>
          <div className="view-toggle-buttons">
            <Button
              className={`view-toggle-button ${
                viewMode === "list" ? "active" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <FaList /> List View
            </Button>
            <Button
              className={`view-toggle-button ${
                viewMode === "grid" ? "active" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh /> Grid View
            </Button>
          </div>
          <Form.Control
            type="text"
            placeholder="Search by title or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-3 search-input"
          />
        </Card.Body>
      </Card>

      <div className="table-container">
        {viewMode === "list" ? (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                getPaginatedEvents().map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{`${event.start_date} to ${event.end_date}`}</td>
                    <td>{event.location}</td>
                    <td>
                      <Button
                        className="action-button edit-button ml-2"
                        onClick={() => handleEditClick(event.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="action-button delete-button ml-2"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No events found</td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
          <div className="grid-view mt-3">
            {filteredEvents.length > 0 ? (
              getPaginatedEvents().map((event) => (
                <div className="grid-item" key={event.id}>
                  <img src={event.image_url} alt={event.title} />
                  <h4>{event.title}</h4>
                  <p>{`${event.start_date} to ${event.end_date}`}</p>
                  <p>{event.location}</p>
                  <div>
                    <Button
                      className="action-button edit-button ml-2"
                      onClick={() => handleEditClick(event.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="action-button delete-button ml-2"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No events found</p>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">{renderPagination()}</div>

      {/* Add Event Modal */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter event title"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter event description"
                required
              />
            </Form.Group>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image_url"
                placeholder="Enter event image URL"
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                placeholder="Enter start date"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                placeholder="Enter end date"
                required
              />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                placeholder="Enter event time"
                required
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter event location"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Event Modal */}
      <EventEditModal
        show={showUpdateModal}
        handleClose={handleCloseUpdate}
        action={action}
        eventId={selectedEventId}
        fetchEvents={fetchEvents}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default EventManagement;
