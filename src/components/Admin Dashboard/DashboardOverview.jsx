import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Pagination } from "react-bootstrap";
import axios from "axios";
import "./DashboardOverview.css"; // Custom CSS file

function DashboardOverview() {
  const [dashboardData, setDashboardData] = useState({
    artworks_count: 0,
    events_count: 0,
    users_count: 0,
    recent_transactions: [],
    bookings: [],
    events: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(4); // Number of transactions per page

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    const fetchDashboardData = async () => {
      try {
        const dashboardResponse = await axios.get(
          "https://the-met-gallery-backend.onrender.com:5000/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData({
          ...dashboardResponse.data,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Pagination logic for transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = dashboardData.recent_transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    dashboardData.recent_transactions.length / transactionsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="dashboard-overview">
      <Row className="justify-content-center g-3">
        <Col md={4} sm={12} className="d-flex justify-content-center">
          <Card className="widget artworks-widget">
            <Card.Body>
              <Card.Title className="widget-title">Artworks</Card.Title>
              <Card.Text className="widget-stat">
                {dashboardData.artworks_count}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className="d-flex justify-content-center">
          <Card className="widget events-widget">
            <Card.Body>
              <Card.Title className="widget-title">Events</Card.Title>
              <Card.Text className="widget-stat">
                {dashboardData.events_count}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className="d-flex justify-content-center">
          <Card className="widget users-widget">
            <Card.Body>
              <Card.Title className="widget-title">Users</Card.Title>
              <Card.Text className="widget-stat">
                {dashboardData.users_count}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Col md={12} className="d-flex justify-content-center">
          <Card className="widget transactions-widget">
            <Card.Body>
              <Card.Title className="widget-title">
                Recent Transactions
              </Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>Order {transaction.id}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Col md={12} className="d-flex justify-content-center">
          <section className="dashboard-section">
            <h2>Bookings</h2>
            {dashboardData.bookings && dashboardData.bookings.length > 0 ? (
              <ul>
                {dashboardData.bookings.map((booking) => (
                  <li key={booking.id}>
                    Booking ID: {booking.id}, Event ID: {booking.event_id}, Date:{" "}
                    {new Date(booking.booking_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings available.</p>
            )}
          </section>
        </Col>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Col md={12} className="d-flex justify-content-center">
          <section className="dashboard-section">
            <h2>Events</h2>
            {dashboardData.events && dashboardData.events.length > 0 ? (
              <ul>
                {dashboardData.events.map((event) => (
                  <li key={event.id}>
                    {event.title} -{" "}
                    {new Date(event.start_date).toLocaleDateString()} to{" "}
                    {new Date(event.end_date).toLocaleDateString()}
                    <br />
                    {event.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events available.</p>
            )}
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardOverview;
