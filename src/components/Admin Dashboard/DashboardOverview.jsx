import React from 'react';
import { Container, Row, Col, Card, ListGroup, Table } from 'react-bootstrap';
import './DashboardOverview.css';

function DashboardOverview() {
    return (
        <Container fluid className="dashboard-overview">
          <Row className="g-4">
            <Col md={3}>
              <Card className="widget">
                <Card.Body>
                  <Card.Title className="widget-title">Artworks</Card.Title>
                  <Card.Text className="widget-stat">120</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="widget">
                <Card.Body>
                  <Card.Title className="widget-title">Events</Card.Title>
                  <Card.Text className="widget-stat">15</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="widget">
                <Card.Body>
                  <Card.Title className="widget-title">Users</Card.Title>
                  <Card.Text className="widget-stat">980</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="widget">
                <Card.Body>
                  <Card.Title className="widget-title">Recent Transactions</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="transaction-item">Order #123 - $200</ListGroup.Item>
                    <ListGroup.Item className="transaction-item">Order #124 - $150</ListGroup.Item>
                    <ListGroup.Item className="transaction-item">Order #125 - $300</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="g-4 mt-4">
            <Col>
              <Card className="recent-activity">
                <Card.Body>
                  <Card.Title className="widget-title">Recent Activity</Card.Title>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Date</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Added new artwork</td>
                        <td>2024-08-15</td>
                        <td>Admin</td>
                      </tr>
                      <tr>
                        <td>Updated event details</td>
                        <td>2024-08-16</td>
                        <td>Admin</td>
                      </tr>
                      <tr>
                        <td>Processed order #126</td>
                        <td>2024-08-17</td>
                        <td>Admin</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    );
};

export default DashboardOverview;
