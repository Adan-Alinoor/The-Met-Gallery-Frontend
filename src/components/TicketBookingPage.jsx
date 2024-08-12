import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TicketBookingPage.css';
import './BackToEventsButton.css';
import axios from 'axios';

const TicketBookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  // const event = events.find(event => event.id.toString() === eventId);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const { ticketPrice } = useParams();
  const { eventName } = useParams();
  const totalAmount = ticketPrice * ticketQuantity;

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));

  const handlePayment = () => {
    alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
  };

  const handleBooking = () => {
    alert(`Booking confirmed for ${ticketQuantity} ticket(s) for ${eventName}. Total: KES ${totalAmount}`);
  };

  const session = JSON.parse(localStorage.getItem('session'));
  const token=session && session.accessToken
  console.log('Retrieved token:', token);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/tickets',{
              headers: {
                "Authorization": `Bearer ${token}`,
                "METHOD":"GET",
              },
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

const handleChange = (event) => {
    setSelectedItem(event.target.value);
};

  // if (!event) {
  //   return <p>Event not found</p>;
  // }

  return (
    <div className="ticket-booking-page">
      <h1>Book Tickets for {eventName}</h1>
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
        <div>
            <label htmlFor="dropdown">Select an item:</label>
            <select id="dropdown" value={selectedItem} onChange={handleChange}>
                <option value="" disabled>Select an option</option>
                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            <div>
                Selected Item ID: {selectedItem}
            </div>
        </div>
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
