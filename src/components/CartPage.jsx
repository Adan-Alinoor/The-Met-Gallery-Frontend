import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css'; // Import component-specific CSS

const CartPage = ({ cartItems, removeItemFromCart, updateItemQuantity }) => {
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
        <div className="cart-summary">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
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
                <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: Ksh {calculateTotalPrice()}</h3>
            <Link to="/checkout" className="checkout-button">Make Order</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
