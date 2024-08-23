import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserManagement.css"; // Custom CSS file

function UserManagement() {
  const [users, setUsers] = useState([]);

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
        toast.error("Error fetching users.");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
        const session = JSON.parse(localStorage.getItem("session"));
        const token = session?.accessToken;

        await axios.delete(
            `https://the-met-gallery-backend.onrender.com/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Remove user from local state
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User deleted successfully.");
    } catch (error) {
        toast.error("Error deleting user.");
        console.error("Error deleting user:", error);
    }
};

  return (
    <Container fluid className="user-management">
      <Row className="justify-content-center g-4">
        <Col lg={12} xl={10}>
          <Card className="user-management-widget">
            <Card.Body>
              <Card.Title className="widget-title">User Management</Card.Title>
              <Row>
                {users.length > 0 ? (
                  users.map((user) => (
                    <Col md={6} lg={4} key={user.id} className="mb-3">
                      <Card className="user-card">
                        <Card.Body>
                          <Card.Title>{user.username}</Card.Title>
                          <Card.Text>
                            <strong>Email:</strong> {user.email}
                          </Card.Text>
                          <Card.Text>
                            <strong>Role:</strong> {user.role}
                          </Card.Text>
                          <Card.Text>
                            <strong>Created At:</strong> {new Date(user.created_at).toLocaleDateString()}
                          </Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col>
                    <p>No users available</p>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default UserManagement;
