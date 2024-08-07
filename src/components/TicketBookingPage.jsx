import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './TicketBookingPage.css';

const TicketBookingPage = ({ events }) => {
  const { eventId } = useParams();
  const event = events.find(event => event.id === parseInt(eventId));

  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(event ? event.ticketPrice : 0);

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleTicketQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    setTicketQuantity(quantity);
    setTotalAmount(quantity * event.ticketPrice);
  };

  const handlePayment = () => {
    
    alert('Payment of KES ${totalAmount} initiated for ${ticketQuantity} tickets.');
  };

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="ticket-booking-page">
      <h1>Book Tickets for {event.name}</h1>
      <p><strong>Price per ticket:</strong> KES {event.ticketPrice}</p>
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
      </form>
    </div>
  );
};

export default TicketBookingPage;