import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CheckoutPage.css';
import Loading from './Loading';

const CheckoutPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderSummary, setOrderSummary] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pCartItems, pTotalAmount } = location.state || {};

  useEffect(() => {
    setLoading(true);
    setOrderSummary(pCartItems);
    setTotalAmount(pTotalAmount);
    
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    if (!token) {
      navigate('/login');
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [navigate, pCartItems, pTotalAmount]);

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePayment = () => {
    setLoading(true);
    
    if (!phoneNumber) {
      alert('Please enter your phone number for M-Pesa payment');
      setLoading(false);
      return;
    }

    if (orderSummary.length === 0) {
      alert('No items in your cart');
      setLoading(false);
      return;
    }

    const items = orderSummary.map(item => ({
      artwork_id: item.artwork_id,
      quantity: item.quantity
    }));

    fetch('https://your-server-url/api/payment', { // Replace with your backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        amount: totalAmount,
        userId: 'your-user-id' // Replace with actual user ID if available
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Payment response data:', data);
      if (data.ResponseCode === '0') {
        alert('Payment request sent successfully. Please check your phone.');
        navigate('/artworks');
      } else {
        alert('Failed to send payment request');
      }
    })
    .catch((error) => {
      console.error('Error sending payment request:', error);
      alert('Error processing payment. Please try again.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  if (loading) return <Loading />

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {orderSummary.length > 0 ? (
            orderSummary.map((item) => (
              <li key={item.artwork_id}>
                {item.artwork.title} - Ksh {item.artwork.price} x {item.quantity}
              </li>
            ))
          ) : (
            <p>No items in your cart.</p>
          )}
        </ul>
        <h2>Total Amount: Ksh {totalAmount}</h2>
      </div>
      <div className="mpesa-payment">
        <h2>M-Pesa Payment</h2>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter M-Pesa phone number"
          />
        </label>
        <button type="button" onClick={handlePayment}>Confirm Payment</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
