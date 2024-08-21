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
      return;
    }
  
    fetch(`https://the-met-gallery-backend.onrender.com:5000/view_cart`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched cart data:', data); // Debugging log
        if (data.items && Array.isArray(data.items)) {
          setOrderSummary(data.items);
          const calculatedTotalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          setTotalAmount(calculatedTotalAmount);
          console.log('Order summary set with items:', data.items); // Additional debugging log
        } else {
          setOrderSummary([]);
          setTotalAmount(0);
          console.warn('No items found in cart or data.items is not an array'); // Warning log
        }
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
      setLoading(false);
  }, [navigate]);
  

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePayment = () => {
    if (!phoneNumber) {
      alert('Please enter your phone number for M-Pesa payment');
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
  
    fetch('https://the-met-gallery-backend.onrender.com:5000/artworkcheckout', {
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
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Checkout response data:', data); // Debugging log
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
