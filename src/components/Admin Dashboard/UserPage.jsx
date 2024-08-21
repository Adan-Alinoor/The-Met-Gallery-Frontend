import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Auth context

const UserPage = () => {
  const { user, isLoading } = useAuth(); // Get user and loading status from auth context
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('View'); // 'Edit', 'View', 'Add'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.is_admin && users.length === 0) {
      fetchUsers();
    }
  }, [user, users]);

  const fetchUsers = async () => {
    console.log('Fetching users...');
    try {
      const response = await axios.get('https://the-met-gallery-backend.onrender.com:5000/users');
      setUsers(response.data); // Adjust based on actual response structure
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users.');
      setLoading(false);
    }
  };

  // ... rest of the code remains the same ...
  const handleShow = (actionType, user = null) => {
    setAction(actionType);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      role: formData.get('role'),
      is_admin: formData.get('role') === 'admin'
    };

    try {
      if (action === 'Add') {
        await axios.post('https://the-met-gallery-backend.onrender.com:5000/users', userData); // Ensure this is the correct endpoint
      } else if (action === 'Edit') {
        await axios.put(`https://the-met-gallery-backend.onrender.com:5000/users/${selectedUser.id}`, userData); // Correct endpoint
      }
      fetchUsers();
      handleClose();
    } catch (err) {
      setError('Failed to save user.');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://the-met-gallery-backend.onrender.com:5000/users/${userId}`); // Ensure this is the correct endpoint
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  if (isLoading || loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <Button variant="primary" onClick={() => handleShow('Add')}>Add User</Button>
      <Accordion className="mt-3">
        {users.map(user => (
          <Card key={user.id}>
            <Accordion.Toggle as={Card.Header} eventKey={user.id}>
              <h5>{user.username}</h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={user.id}>
              <Card.Body>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <Button variant="warning" onClick={() => handleShow('Edit', user)}>Edit</Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(user.id)}>Delete</Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                defaultValue={action === 'Edit' ? selectedUser?.username : ''}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                defaultValue={action === 'Edit' ? selectedUser?.email : ''}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                defaultValue={action === 'Edit' ? selectedUser?.role : 'user'}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {action === 'Add' ? 'Add User' : 'Save Changes'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserPage;
