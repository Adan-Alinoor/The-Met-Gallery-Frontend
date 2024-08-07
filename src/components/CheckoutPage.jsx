import React from 'react';
import './CheckoutPage.css'; // Import component-specific CSS

const CheckoutPage = ({ cartItems }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace('Ksh ', '').replace(',', '')), 0).toFixed(2);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.title} className="checkout-item-image" />
                <div className="checkout-item-info">
                  <h3>{item.title}</h3>
                  <p><strong>Artist:</strong> {item.artist}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <h3>Total: Ksh {calculateTotalPrice()}</h3>
            <button className="payment-button">Pay with M-Pesa</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
