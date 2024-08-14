
// import React, { useState, useEffect } from 'react';
// import CheckoutPageModal from './CheckoutPageModal'; // Import CheckoutPageModal
// import './CartPage.css'; // Import component-specific CSS

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isModalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const session = JSON.parse(localStorage.getItem('session'));
//         const token = session && session.accessToken;

//         const response = await fetch(`http://127.0.0.1:5555/view_cart/${session.user.id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setCartItems(data.items);
//         } else {
//           const errorData = await response.json();
//           console.error('Failed to fetch cart items:', errorData.error);
//         }
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };

//     fetchCartItems();
//   }, []);

  
//   const removeItemFromCart = async (artworkId) => {
//     try {
//       // Retrieve the session from localStorage
//       const session = JSON.parse(localStorage.getItem('session'));
//       const token = session && session.accessToken; // Extract the token from the session
  
//       // Make a DELETE request to the backend to remove the item from the cart
//       const response = await fetch('http://127.0.0.1:5555/remove_from_cart', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Include the token in the Authorization header
//         },
//         body: JSON.stringify({
//           user_id: session.user.id, // Send the user ID
//           artwork_id: artworkId     // Send the artwork ID to be removed
//         })
//       });
  
//       // Check if the response is OK (status code 200)
//       if (response.ok) {
//         // Remove the item from the cart in the frontend state
//         setCartItems(prevItems => prevItems.filter(item => item.artwork_id !== artworkId));
//       } else {
//         // Handle any errors returned by the backend
//         const errorData = await response.json();
//         console.error('Failed to remove item from cart:', errorData.error);
//       }
//     } catch (error) {
//       // Catch and log any network or other errors
//       console.error('Error removing item from cart:', error);
//     }
//   };
  
//   const handleQuantityChange = (id, event) => {
//     const quantity = parseInt(event.target.value, 10);
//     if (quantity > 0) {
//       updateItemQuantity(id, quantity);
//     }
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price), 0).toFixed(2);
//   };

//   return (
//     <div className="cart-container">
//       <h1>Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
//       ) : (
//         <div className="cart-items">
//           {cartItems.map(item => (
//             <div key={item.id} className="cart-item">
//               <div className="cart-item-image-card">
//                 <img src={item.image} alt={item.title} className="cart-item-image" />
//               </div>
//               <div className="cart-item-details-card">
//                 <div className="cart-item-info">
//                   <h2>{item.title}</h2>
//                   <p>{item.description}</p>
//                   <p>{item.price}</p>
//                 </div>
//                 <div className="cart-item-actions">
//                   <label>
//                     Quantity:
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleQuantityChange(item.id, e)}
//                       className="quantity-input"
//                     />
//                   </label>
//                   {/* <button onClick={() => removeItemFromCart(item.id)} className="remove-button">Remove</button> */}
//                   <button onClick={() => removeItemFromCart(item.artwork_id)}>Remove</button>

//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="cart-total">
//             <h2>Total: Ksh {calculateTotalPrice()}</h2>
//             <button onClick={() => setModalOpen(true)} className="checkout-button">Proceed to Checkout</button>
//           </div>
//         </div>
//       )}
//       <CheckoutPageModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
//     </div>
//   );
// };

// export default CartPage;

import React, { useState, useEffect } from 'react';
import CheckoutPageModal from './CheckoutPageModal'; // Import CheckoutPageModal component
import './CartPage.css'; // Import component-specific CSS

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        const token = session && session.accessToken;

        const response = await fetch(`http://127.0.0.1:5555/view_cart/${session.user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch cart items:', errorData.error);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeItemFromCart = async (artworkId) => {
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session && session.accessToken;

      const response = await fetch('http://127.0.0.1:5555/remove_from_cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: session.user.id,
          artwork_id: artworkId
        })
      });

      if (response.ok) {
        setCartItems(prevItems => prevItems.filter(item => item.artwork_id !== artworkId));
      } else {
        const errorData = await response.json();
        console.error('Failed to remove item from cart:', errorData.error);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateItemQuantity = async (artworkId, newQuantity) => {
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session && session.accessToken;

      const response = await fetch('http://127.0.0.1:5555/update-cart-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: session.user.id,
          artwork_id: artworkId,
          quantity: newQuantity
        })
      });

      if (response.ok) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.artwork_id === artworkId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        const errorData = await response.json();
        console.error('Failed to update item quantity:', errorData.error);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price), 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.artwork_id} className="cart-item">
              <div className="cart-item-image-card">
                <img src={item.image} alt={item.title} className="cart-item-image" />
              </div>
              <div className="cart-item-details-card">
                <div className="cart-item-info">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <p>{item.price}</p>
                  <p>
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.artwork_id, e)}
                      className="quantity-input"
                    />
                  </p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => removeItemFromCart(item.artwork_id)} className="remove-button">Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: Ksh {calculateTotalPrice()}</h2>
            <button onClick={handleProceedToCheckout} className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
      {/* Checkout Page Modal */}
      <CheckoutPageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cartItems={cartItems}
        calculateTotalPrice={calculateTotalPrice}
      />
    </div>
  );
};

export default CartPage;



