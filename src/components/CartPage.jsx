// CartPage.js
import React, { useState } from 'react';
import CheckoutPageModal from './CheckoutPageModal'; // Import CheckoutPageModal
import './CartPage.css'; // Import component-specific CSS

const CartPage = ({ cartItems, removeItemFromCart, updateItemQuantity }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace('Ksh ', '').replace(',', '')), 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image-card">
                <img src={item.image} alt={item.title} className="cart-item-image" />
              </div>
              <div className="cart-item-details-card">
                <div className="cart-item-info">
                  <h2>{item.title}</h2>
                  <p><strong>Artist:</strong> {item.artist}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <p><strong>Quantity:</strong>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(item.id, event)}
                    />
                  </p>
                  <p><strong>Artwork ID:</strong> {item.id}</p> {/* Display Artwork ID */}
                </div>
                <div className="cart-item-buttons">
                  <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: Ksh {calculateTotalPrice()}</h3>
            <button className="checkout-button" onClick={() => setModalOpen(true)}>Make Order</button>
          </div>
        </div>
      )}
      <CheckoutPageModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        cartItems={cartItems}
        calculateTotalPrice={calculateTotalPrice}
      />
    </div>
  );
};

export default CartPage;
