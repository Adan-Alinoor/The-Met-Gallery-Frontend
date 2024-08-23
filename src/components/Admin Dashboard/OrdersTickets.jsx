import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderTickets.css";

const OrdersTickets = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const session = JSON.parse(localStorage.getItem("session"));
  const token = session?.accessToken;

  const fetchPayments = () => {
    setLoading(true);
    axios
      .get("https://the-met-gallery-backend.onrender.com/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the payments!", error);
        setLoading(false);
      });
  };

  const fetchOrderDetails = (orderId) => {
    axios
      .get(
        `https://the-met-gallery-backend.onrender.com/order-details/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the order details!", error);
      });
  };

  const fetchBookingDetails = (bookingId) => {
    axios
      .get(
        `https://the-met-gallery-backend.onrender.com/booking-details/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setBookingDetails(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the booking details!",
          error
        );
      });
  };

  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    if (payment.order_id) {
      fetchOrderDetails(payment.order_id);
    } else if (payment.booking_id) {
      fetchBookingDetails(payment.booking_id);
    }
  };

  useEffect(() => {
    if (selectedPayment) {
      if (selectedPayment.order_id) {
        fetchOrderDetails(selectedPayment.order_id);
      } else if (selectedPayment.booking_id) {
        fetchBookingDetails(selectedPayment.booking_id);
      }
    }
  }, [selectedPayment]);

  const handleCloseModal = () => {
    setSelectedPayment(null);
    setOrderDetails(null);
    setBookingDetails(null);
  };

  return (
    <Container className="mt-5">
      <h2>Admin Payment Tracking</h2>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Status</th>
              <th>User ID</th>
              <th>Phone Number</th>
              <th>Order ID</th>
              <th>Booking ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id} onClick={() => handleRowClick(payment)}>
                <td>{index + 1}</td>
                <td>${payment.amount}</td>
                <td>{payment.status}</td>
                <td>{payment.user_id}</td>
                <td>{payment.phone_number}</td>
                <td>{payment.order_id || "Null"}</td>
                <td>{payment.booking_id || "Null"}</td>
                <td>{new Date(payment.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for detailed view */}
      <Modal show={!!selectedPayment} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <>
              {orderDetails && orderDetails.items && (
                <div className="details-section">
                  <h5>Order Details</h5>
                  {orderDetails.items.map((item) => (
                    <div key={item.id}>
                      <h6>Artwork</h6>
                      <p><strong>Title:</strong> {item.title}</p>
                      <p><strong>Description:</strong> {item.description}</p>
                      <p><strong>Price:</strong> ${item.price}</p>
                      <img src={item.image} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                  ))}
                  <p><strong>Total Price:</strong> ${orderDetails.total_price}</p>
                  <p><strong>Status:</strong> {orderDetails.status}</p>
                  <p><strong>Created At:</strong> {new Date(orderDetails.created_at).toLocaleDateString()}</p>
                </div>
              )}

              {bookingDetails && bookingDetails.event && (
                <div className="details-section">
                  <h5>Booking Details</h5>
                  <p><strong>Event Title:</strong> {bookingDetails.event.title}</p>
                  <p><strong>Description:</strong> {bookingDetails.event.description}</p>
                  <p><strong>Start Date:</strong> {new Date(bookingDetails.event.start_date).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(bookingDetails.event.end_date).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {bookingDetails.event.location}</p>
                  <p><strong>Time:</strong> {bookingDetails.event.time}</p>
                  <img src={bookingDetails.event.image_url} alt={bookingDetails.event.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  <p><strong>Status:</strong> {bookingDetails.status}</p>
                  <p><strong>Created At:</strong> {new Date(bookingDetails.created_at).toLocaleDateString()}</p>
                </div>
              )}
            </>
          
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrdersTickets;
