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


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Loading from './Loading'

// const TicketBookingPage = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState(null);
//   const [selectedItem, setSelectedItem] = useState({});

//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [ticketQuantity, setTicketQuantity] = useState(1);
//   const { eventName } = useParams();
//   const [eventPrice, setEventPrice] = useState(0)
//   const totalAmount = Number(eventPrice) * Number(ticketQuantity);
//   console.log(totalAmount)

//   const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
//   const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));


//   // '''
//   // const fetchArtworks = async () => {
//   //   const session = JSON.parse(localStorage.getItem('session'));
//   //   const token=session && session.accessToken
//   //   console.log('Retrieved token:', token); // Debugging: check the retrieved token
  
//   //   if (!token) {
//   //     // If there's no token, redirect to login
//   //     navigate('/');
//   //     return;
//   //   }
  
//   //   try {
//   //     const response = await fetch('http://127.0.0.1:5555/artworks', {
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`
//   //       }
//   //     });
  
//   //     if (!response.ok) {
//   //       console.log('Response status:', response.status); // Debugging: check response status
//   //       if (response.status === 401) {
//   //         // If unauthorized, redirect to login
//   //         navigate('/');
//   //       } else {
//   //         throw new Error('Failed to fetch artworks');
//   //       }
//   //     }
  
//   //     const data = await response.json();
//   //     setArtworks(data);
//   //   } catch (error) {
//   //     setError(error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchArtworks();
//   // }, []);
  
//   // '''
//   const handlePayment = () => {

//     const session = JSON.parse(localStorage.getItem('session'));
//     const token=session && session.accessToken
//     console.log('Retrieved token:', token);
//     if (!token) {
//       // If there's no token, redirect to login
//       navigate('/');
//       return;
//     }
  
//     try {
//       const response = await fetch('http://127.0.0.1:5555/eventcheckout', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
  
//       if (!response.ok) {const handlePayment = () => {

//         const session = JSON.parse(localStorage.getItem('session'));
//         const token=session && session.accessToken
//         console.log('Retrieved token:', token);
//         if (!token) {
//           // If there's no token, redirect to login
//         console.log('Response status:', response.status); // Debugging: check response status
//         if (response.status === 401) {
//           // If unauthorized, redirect to login
//           navigate('/');
//         } else {
//           throw new Error('Failed to make payment');
//         }
//       }
  
//       const data = await response.json();
//       setTickets(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     fetchTickets();
//   }, []);

//     alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
//   };

//   // const session = JSON.parse(localStorage.getItem('session'));
//   // const token=session && session.accessToken
//   // console.log('Retrieved token:', token);

//   const handleBooking = async (event) => {
//       event.preventDefault();

//       const formData = {
//           event_id: eventId,
//           ticket_id: selectedItem,
//           total_amount: parseInt(totalAmount, 10),
//           quantity: parseInt(quantity, 10)
//       };

//       try {
//         const response = await axios.post('http://127.0.0.1:5555/bookings', formData, {
//             headers: {
//               'Content-Type': 'application/json',
//               "Authorization": `Bearer ${token}`,
//               "METHOD":"GET",
//             }
//         });

//         console.log('Response:', response.data);
//         alert('Booking successful!');
//       } catch (error) {
//           console.error('Error posting data:', error);
//           alert('Error submitting booking.');
//       }
//     };

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:5555/events/${eventId}`,{
//               headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "METHOD":"GET",
//               },
//             });
//             setItems(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//       };

//       fetchData();
//   }, []);

//   const handleChange = (event) => {
//       const selectedValue = event.target.value;
//       if (selectedValue) {
//           try {
//               const item = JSON.parse(selectedValue);
//               setSelectedItem(item);
//               setEventPrice(item.price);
//           } catch (error) {
//               console.error('Error parsing selected item:', error);
//           }
//       } else {
//           setSelectedItem(null);
//       }
//   };

//   if (items == null) {
//     return <Loading />
//   }

//   return (
//     <div className="ticket-booking-page">
//       <h1>Book Tickets for {eventName}</h1>
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
//             <label htmlFor="dropdown">Select a Ticket:</label>
//             <select id="dropdown" value={selectedItem ? JSON.stringify(selectedItem) : ''} onChange={handleChange}>
//               <option value="" disabled>Select an option</option>
//               {items.tickets.map((item) => (
//                   <option key={item.id} value={JSON.stringify(item)}>
//                       {item.type_name} @ KSh.{item.price}
//                   </option>
//               ))}
//             </select>
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
// }

// export default TicketBookingPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Loading from './Loading';

// const TicketBookingPage = () => {
//   const { eventId, eventName } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState(null);
//   const [selectedItem, setSelectedItem] = useState({});
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [ticketQuantity, setTicketQuantity] = useState(1);
//   const [eventPrice, setEventPrice] = useState(0);
//   const totalAmount = Number(eventPrice) * Number(ticketQuantity);

//   const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
//   const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));

//   // Fetch the event details and ticket information
//   useEffect(() => {
//     const fetchData = async () => {
//       const session = JSON.parse(localStorage.getItem('session'));
//       const token = session && session.accessToken;

//       if (!token) {
//         // If there's no token, redirect to login
//         navigate('/');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://127.0.0.1:5555/events/${eventId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         setItems(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         alert('Failed to fetch event data.');
//       }
//     };

//     fetchData();
//   }, [eventId, navigate]);

//   // Handle ticket selection
//   const handleChange = (event) => {
//     const selectedValue = event.target.value;
//     if (selectedValue) {
//       try {
//         const item = JSON.parse(selectedValue);
//         setSelectedItem(item);
//         setEventPrice(item.price);
//       } catch (error) {
//         console.error('Error parsing selected item:', error);
//       }
//     } else {
//       setSelectedItem(null);
//     }
//   };

//   // Handle the payment process
//   // const handlePayment = async () => {
//   //   const session = JSON.parse(localStorage.getItem('session'));
//   //   const token = session && session.accessToken;

//   //   if (!token) {
//   //     navigate('/');
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post('http://127.0.0.1:5555/eventcheckout', {
//   //       event_id: eventId,
//   //       ticket_id: selectedItem.id,
//   //       total_amount: totalAmount,
//   //       quantity: ticketQuantity,
//   //     }, {
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //       },
//   //     });

//   //     console.log('Payment response:', response.data);
//   //     alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
//   //   } catch (error) {
//   //     console.error('Error making payment:', error);
//   //     alert('Error processing payment.');
//   //   }
//   // };
//   const handlePayment = async () => {
//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session && session.accessToken;
//     const userId = session && session.userId;
  
//     if (!token) {
//       navigate('/');
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://127.0.0.1:5555/eventcheckout', {
//         user_id: userId,
//         event_id: eventId,
//         ticket_id: selectedItem.id,
//         total_amount: totalAmount,
//         quantity: ticketQuantity,
//         phone_number: phoneNumber // Add this line
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       console.log('Payment response:', response.data);
//       alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
//     } catch (error) {
//    console.error('Error making payment:', error.response.data);
//    alert(`Error processing payment: ${error.response.data.error || 'Unknown error'}`);
// }
//   };
  


//   // Handle the booking process
//   const handleBooking = async (event) => {
//     event.preventDefault();

//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session && session.accessToken;

//     if (!token) {
//       navigate('/');
//       return;
//     }

//     const formData = {
//       event_id: eventId,
//       ticket_id: selectedItem.id,
//       total_amount: totalAmount,
//       quantity: ticketQuantity,
//     };

//     try {
//       const response = await axios.post('http://127.0.0.1:5555/bookings', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       console.log('Booking response:', response.data);
//       alert('Booking successful!');
//     } catch (error) {
//       console.error('Error posting data:', error);
//       alert('Error submitting booking.');
//     }
//   };

//   if (items == null) {
//     return <Loading />;
//   }

//   return (
//     <div className="ticket-booking-page">
//       <h1>Book Tickets for {eventName}</h1>
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
//           <label htmlFor="dropdown">Select a Ticket:</label>
//           <select id="dropdown" value={selectedItem ? JSON.stringify(selectedItem) : ''} onChange={handleChange}>
//             <option value="" disabled>Select an option</option>
//             {items.tickets.map((item) => (
//               <option key={item.id} value={JSON.stringify(item)}>
//                 {item.type_name} @ KSh.{item.price}
//               </option>
//             ))}
//           </select>
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
// }

// export default TicketBookingPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const TicketBookingPage = () => {
  const { eventId, eventName } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [eventPrice, setEventPrice] = useState(0);
  const totalAmount = Number(eventPrice) * Number(ticketQuantity);

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));

  useEffect(() => {
    const fetchData = async () => {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session?.accessToken;

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:5555/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch event data.');
      }
    };

    fetchData();
  }, [eventId, navigate]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      try {
        const item = JSON.parse(selectedValue);
        setSelectedItem(item);
        setEventPrice(item.price); // Ensure this is updating correctly
      } catch (error) {
        console.error('Error parsing selected item:', error);
      }
    } else {
      setSelectedItem({});
      setEventPrice(0); // Reset the price if no item is selected
    }
  };

  const handlePayment = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;
    const userId = session?.user?.id

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5555/eventcheckout', {
        user_id: userId,
        event_id: eventId,
        ticket_id: selectedItem.id,
        ticket_type: selectedItem.type_name, //added
        total_amount: totalAmount,
        quantity: ticketQuantity,
        phone_number: phoneNumber,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Payment response:', response.data);
      alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
    } catch (error) {
      console.error('Error making payment:', error.response?.data || error);
      alert(`Error processing payment: ${error.response?.data.error || 'Unknown error'}`);
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    if (!token) {
      navigate('/');
      return;
    }

    const formData = {
      event_id: eventId,
      ticket_id: selectedItem.id,
      total_amount: totalAmount,
      quantity: ticketQuantity,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5555/bookings', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Booking response:', response.data);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Error submitting booking.');
    }
  };

  if (items === null) {
    return <Loading />;
  }

  return (
    <div className="ticket-booking-page">
      <h1>Book Tickets for {eventName}</h1>
      <form onSubmit={handleBooking}>
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
        <button type="submit">Confirm Booking</button>
      </form>
      <button className="back-to-events-button" onClick={() => navigate('/')}>
        Back to Events
      </button>
    </div>
  );
};

export default TicketBookingPage;






