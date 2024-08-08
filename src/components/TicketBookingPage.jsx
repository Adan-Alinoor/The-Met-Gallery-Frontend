import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TicketBookingPage.css';
import './BackToEventsButton.css';

const TicketBookingPage = ({ events }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = events.find(event => event.id.toString() === eventId);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const ticketPrice = event ? event.ticketPrice : 0;
  const totalAmount = ticketPrice * ticketQuantity;

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));

  const handlePayment = () => {
    alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
  };

  const handleBooking = () => {
    alert(`Booking confirmed for ${ticketQuantity} ticket(s) for ${event.name}. Total: KES ${totalAmount}`);
  };

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="ticket-booking-page">
      <h1>Book Tickets for {event.name}</h1>
      <p><strong>Price per ticket:</strong> KES {ticketPrice}</p>
      <form>
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} required />
        </label>
        <label>
          Ticket Quantity:
          <input type="number" value={ticketQuantity} onChange={handleTicketQuantityChange} min="1" required />
        </label>
        <p><strong>Total Amount:</strong> KES {totalAmount}</p>
        <button type="button" onClick={handlePayment}>Pay with Mpesa</button>
        <button type="button" onClick={handleBooking}>Confirm Booking</button>
      </form>
      <button className="back-to-events-button" onClick={() => navigate('/')}>
        Back to Events
      </button>
    </div>
  );
};

export default TicketBookingPage;
