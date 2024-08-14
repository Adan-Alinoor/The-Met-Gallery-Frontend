// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './TicketBookingPage.css';
// import './BackToEventsButton.css';
// import axios from 'axios';

// const TicketBookingPage = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState('');
//   // const event = events.find(event => event.id.toString() === eventId);

//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [ticketQuantity, setTicketQuantity] = useState(1);
//   const { ticketPrice } = useParams();
//   const { eventName } = useParams();
//   const totalAmount = ticketPrice * ticketQuantity;

//   const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
//   const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));

//   const handlePayment = () => {
//     alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
//   };

//   const handleBooking = () => {
//     alert(`Booking confirmed for ${ticketQuantity} ticket(s) for ${eventName}. Total: KES ${totalAmount}`);
//   };

//   const session = JSON.parse(localStorage.getItem('session'));
//   const token=session && session.accessToken
//   console.log('Retrieved token:', token);
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:5555/tickets',{
//               headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "METHOD":"GET",
//               },
//             });
//             setItems(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     fetchData();
// }, []);

// const handleChange = (event) => {
//     setSelectedItem(event.target.value);
// };

//   // if (!event) {
//   //   return <p>Event not found</p>;
//   // }

//   return (
//     <div className="ticket-booking-page">
//       <h1>Book Tickets for {eventName}</h1>
//       <p><strong>Price per ticket:</strong> KES {ticketPrice}</p>
//       <form>
//         <label>
//           Phone Number:
//           <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} required />
//         </label>
//         <label>
//           Ticket Quantity:
//           <input type="number" value={ticketQuantity} onChange={handleTicketQuantityChange} min="1" required />
//         </label>
//         <div>
//             <label htmlFor="dropdown">Select an item:</label>
//             <select id="dropdown" value={selectedItem} onChange={handleChange}>
//                 <option value="" disabled>Select an option</option>
//                 {items.map((item) => (
//                     <option key={item.id} value={item.id}>
//                         {item.name}
//                     </option>
//                 ))}
//             </select>
//             <div>
//                 Selected Item ID: {selectedItem}
//             </div>
//         </div>
//         <p><strong>Total Amount:</strong> KES {totalAmount}</p>
//         <button type="button" onClick={handlePayment}>Pay with Mpesa</button>
//         <button type="button" onClick={handleBooking}>Confirm Booking</button>
//       </form>
//       <button className="back-to-events-button" onClick={() => navigate('/')}>
//         Back to Events
//       </button>
//     </div>
//   );
// };

// export default TicketBookingPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function TicketBookingPage() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { eventId, eventName, ticketPrice } = useParams();
  const navigate = useNavigate();

  // Calculate total amount based on selected ticket and quantity
  const totalAmount = ticketPrice * quantity;

  // Fetch available tickets from the backend
  useEffect(() => {
    const fetchTickets = async () => {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session && session.accessToken;
      console.log('Retrieved token:', token); // Debugging: check the retrieved token

      if (!token) {
        // If there's no token, redirect to login
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5555/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          console.log('Response status:', response.status); // Debugging: check response status
          if (response.status === 401) {
            // If unauthorized, redirect to login
            navigate('/');
          } else {
            throw new Error('Failed to fetch tickets');
          }
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [navigate]);

  // Handle ticket selection
  const handleTicketChange = (e) => {
    setSelectedTicket(e.target.value);
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!selectedTicket || quantity < 1 || !phoneNumber) {
      alert("Please select a ticket type, quantity, and enter a valid phone number.");
      return;
    }

    const session = JSON.parse(localStorage.getItem('session'));
    const token = session && session.accessToken;

    try {
      const response = await axios.post('http://localhost:5555/eventcheckout', {
        user_id: 1,
        ticket_type: selectedTicket,
        quantity: quantity,
        phone_number: phoneNumber,
        callback_url: 'https://fcbf-102-214-74-3.ngrok-free.app' // Set your callback URL here
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert(`Payment of KES ${totalAmount} initiated for ${quantity} ticket(s) for ${eventName}.`);
    } catch (error) {
      console.error("There was an error during checkout!", error);
      alert("There was an error during checkout. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Book Tickets for {eventName}</h2>
      <p><strong>Price per ticket:</strong> KES {ticketPrice}</p>
      <div>
        <label htmlFor="dropdown">Select Ticket Type:</label>
        <select id="dropdown" value={selectedTicket} onChange={handleTicketChange}>
          <option value="" disabled>Select an option</option>
          {tickets.map(ticket => (
            <option key={ticket.id} value={ticket.type_name}>
              {ticket.type_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label>Phone Number:</label>
        <input type="text" className="form-control" placeholder="254712345678" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      </div>
      <div className="form-group mt-3">
        <label>Ticket Quantity:</label>
        <input type="number" className="form-control" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" />
      </div>
      <p><strong>Total Amount:</strong> KES {totalAmount}</p>
      <button className="btn btn-success mt-4" onClick={handleCheckout}>Pay with Mpesa</button>
      <button className="btn btn-primary mt-4" onClick={() => navigate('/events')}>Back to Events</button>
    </div>
  );
}

export default TicketBookingPage;




