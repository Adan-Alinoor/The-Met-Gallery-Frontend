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
        const response = await axios.get(`https://the-met-gallery-backend.onrender.com/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setItems(response.data);
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
        setEventPrice(item.price);
      } catch (error) {
        console.error('Error parsing selected item:', error);
      }
    } else {
      setSelectedItem({});
      setEventPrice(0);
    }
  };

  const handlePayment = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;
    const userId = session?.user?.id;
  
    if (!token) {
      navigate('/');
      return;
    }
  
    try {
      const response = await axios.post('https://the-met-gallery-backend.onrender.com/eventcheckout', {
        user_id: userId,
        ticket_type: selectedItem.type_name,
        total_amount: totalAmount,
        quantity: ticketQuantity,
        phone_number: phoneNumber,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
      navigate('/my-bookings');
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
      await axios.post('https://the-met-gallery-backend.onrender.com/bookings', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      alert('Booking successful!');
      handlePayment();
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Error submitting booking.');
    }
  };

  if (items === null) {
    return <Loading />;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">{`Book Tickets for ${eventName}`}</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <form onSubmit={handleBooking}>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control form-control-sm"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ticketQuantity" className="form-label">Ticket Quantity</label>
              <input
                type="number"
                id="ticketQuantity"
                className="form-control form-control-sm"
                value={ticketQuantity}
                onChange={handleTicketQuantityChange}
                min="1"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dropdown" className="form-label">Select a Ticket</label>
              <select
                id="dropdown"
                className="form-select form-select-sm"
                value={selectedItem ? JSON.stringify(selectedItem) : ''}
                onChange={handleChange}
              >
                <option value="" disabled>Select an option</option>
                {items.tickets.map((item) => (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item.type_name} @ KSh.{item.price}
                  </option>
                ))}
              </select>
            </div>
            <p className="font-weight-bold mb-3">Total Amount: KES {totalAmount}</p>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-success"
                onClick={handlePayment}
              >
                Pay with Mpesa
              </button>
              <button
                type="submit"
                className="btn btn-success"
              >
                Confirm Booking
              </button>
            </div>
          </form>
          <button
            className="btn btn-secondary mt-4"
            onClick={() => navigate('/events')}
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingPage;
