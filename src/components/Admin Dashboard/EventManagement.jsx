import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
//import './EventManagement.css'; // Import the CSS file

const EventManagement = () => {
  const [show, setShow] = useState(false);
  const [action, setAction] = useState('Add'); // 'Add' or 'Edit'
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={() => { setAction('Add'); handleShow(); }}>Add Event</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          <tr>
            <td>Event 1</td>
            <td>2024-08-15</td>
            <td>Location 1</td>
            <td>Active</td>
            <td>
              <Button variant="warning" onClick={() => { setAction('Edit'); handleShow(); }}>Edit</Button>
              <Button variant="danger" className="ml-2">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Add/Edit Event Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action} Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter location" />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select">
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {action} Event
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventManagement;
