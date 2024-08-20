


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderSummary, setOrderSummary] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;
    const userId = session?.user?.id;

    if (!token || !userId) {
      navigate('/checkout');
      return;
    }

    fetch(`https://the-met-gallery-backend.onrender.com/view_cart/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setOrderSummary(data.items);
          setTotalAmount(data.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
        } else {
          setOrderSummary([]);
          setTotalAmount(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, [navigate]);

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePayment = () => {
    if (!phoneNumber) {
      alert('Please enter your phone number for M-Pesa payment');
      return;
    }
  
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;
    const userId = session?.user?.id;
  
    if (!token || !userId) {
      navigate('/checkout');
      return;
    }
  
    if (orderSummary.length === 0) {
      alert('No items in your cart');
      return;
    }
  
    const items = orderSummary.map(item => ({
      artwork_id: item.artwork_id,
      quantity: item.quantity
    }));
  
    fetch('https://the-met-gallery-backend.onrender.com/artworkcheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        phone_number: phoneNumber,
        items: items
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert('Order placed successfully');
        navigate('/artworks');
      } else {
        alert('Failed to place order');
      }
    })
    .catch((error) => {
      console.error('Error placing order:', error);
      navigate('/checkout');
    });
  };

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {orderSummary.map((item) => (
            <li key={item.artwork_id}>
              {item.title} - Ksh {item.price} x {item.quantity}
            </li>
          ))}
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

