import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
//import './UserPage.css'; // Import the CSS file

const UserPage = () => {
  const [show, setShow] = useState(false);
  const [action, setAction] = useState('Edit'); // 'Edit' or 'View'
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          <tr>
            <td>User1</td>
            <td>user1@example.com</td>
            <td>Active</td>
            <td>
              <Button variant="warning" onClick={() => { setAction('Edit'); handleShow(); }}>Edit</Button>
              <Button variant="danger" className="ml-2">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select">
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {action} User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserPage;
