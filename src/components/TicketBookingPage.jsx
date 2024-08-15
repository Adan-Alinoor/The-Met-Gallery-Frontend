import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading'

const TicketBookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const { eventName } = useParams();
  const [eventPrice, setEventPrice] = useState(0)
  const totalAmount = Number(eventPrice) * Number(ticketQuantity);
  console.log(totalAmount)

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));

  const handlePayment = () => {
    alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
  };

  const session = JSON.parse(localStorage.getItem('session'));
  const token=session && session.accessToken
  console.log('Retrieved token:', token);

  const handleBooking = async (event) => {
      event.preventDefault();

      const formData = {
          event_id: eventId,
          ticket_id: selectedItem,
          total_amount: parseInt(totalAmount, 10),
          quantity: parseInt(quantity, 10)
      };

      try {
        const response = await axios.post('http://127.0.0.1:5555/bookings', formData, {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`,
              "METHOD":"GET",
            }
        });

        console.log('Response:', response.data);
        alert('Booking successful!');
      } catch (error) {
          console.error('Error posting data:', error);
          alert('Error submitting booking.');
      }
    };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5555/events/${eventId}`,{
              headers: {
                "Authorization": `Bearer ${token}`,
                "METHOD":"GET",
              },
            });
            setItems(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };

      fetchData();
  }, []);

  const handleChange = (event) => {
      const selectedValue = event.target.value;
      if (selectedValue) {
          try {
              const item = JSON.parse(selectedValue);
              setSelectedItem(item);
              setEventPrice(item.price);
          } catch (error) {
              console.error('Error parsing selected item:', error);
          }
      } else {
          setSelectedItem(null);
      }
  };

  if (items == null) {
    return <Loading />
  }

  return (
    <div className="ticket-booking-page">
      <h1>Book Tickets for {eventName}</h1>
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
            <label htmlFor="dropdown">Select a Ticket:</label>
            <select id="dropdown" value={selectedItem ? JSON.stringify(selectedItem) : ''} onChange={handleChange}>
              <option value="" disabled>Select an option</option>
              {items.tickets.map((item) => (
                  <option key={item.id} value={JSON.stringify(item)}>
                      {item.type_name} @ KSh.{item.price}
                  </option>
              ))}
            </select>
        </div>
        <p><strong>Total Amount:</strong> KES {totalAmount}</p>
        <button type="button" onClick={handlePayment}>Pay with Mpesa</button>
        <button type="button" onClick={handleBooking}>Confirm Booking</button>
      </form>
      <button className="back-to-events-button" onClick={() => navigate('/events')}>
        Back to Events
      </button>
    </div>
  );
}

export default TicketBookingPage;




