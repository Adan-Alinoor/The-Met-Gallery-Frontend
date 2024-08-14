import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [shippingDetails, setShippingDetails] = useState({ address: '', phoneNumber: '' });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePayment = () => {
    // Handle payment logic here
    alert('Payment processing...');
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        {/* Replace the following with actual order items */}
        <div className="order-item">
          <div className="order-item-image">
            <img src="https://via.placeholder.com/100" alt="Artwork" />
          </div>
          <div className="order-item-info">
            <h3>Artwork Title</h3>
            <p>Description of the artwork</p>
            <p>Price: Ksh 2000</p>
            <p>Quantity: 1</p>
          </div>
        </div>
        {/* Add more order items here */}
      </div>

      <div className="shipping-details">
        <h3>Shipping Details</h3>
        <label>
          Address:
          <textarea
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            rows="4"
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={shippingDetails.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </label>
      </div>

      <button className="payment-button" onClick={handlePayment}>
        Make Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
