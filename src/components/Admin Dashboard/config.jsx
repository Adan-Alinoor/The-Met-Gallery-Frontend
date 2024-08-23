import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "./UserManagement.css"; // Custom CSS file

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const session = JSON.parse(localStorage.getItem("session"));
        const token = session?.accessToken;

        const response = await axios.get(
          "https://the-met-gallery-backend.onrender.com/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users.");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      const token = session?.accessToken;

      await axios.delete(`https://the-met-gallery-backend.onrender.com/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove user from local state
      setUsers(users.filter((user) => user.id !== userId));
      setSuccess("User deleted successfully.");
    } catch (error) {
      setError("Error deleting user.");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container fluid className="user-management">
      <Row className="justify-content-center g-3">
        <Col md={12} className="d-flex justify-content-center">
          <Card className="widget user-management-widget">
            <Card.Body>
              <Card.Title className="widget-title">Manage Users</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <div className="user-list">
                {users.length > 0 ? (
                  users.map((user) => (
                    <Card className="user-card" key={user.id}>
                      <Card.Body>
                        <Row>
                          <Col md={8} className="user-info">
                            <h5>{user.username}</h5>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Created At: {new Date(user.created_at).toLocaleDateString()}</p>
                          </Col>
                          <Col md={4} className="user-actions">
                            <Button variant="danger" onClick={() => handleDelete(user.id)}>
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>No users available</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserManagement;
