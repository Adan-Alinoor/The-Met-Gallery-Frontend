// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CartPage.css';
// import Loading from './Loading';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       setLoading(true);
//       try {    
//         const response = await fetch('https://the-met-gallery-backend.onrender.com/view_cart');
    
//         if (!response.ok) {
//           throw new Error('Cart not found');
//         }
    
//         const data = await response.json();
//         setCartItems(data.cart_items);
//         setLoading(false);

//       } catch (error) {
//         console.error('Failed to fetch cart items:', error.message);
//         setLoading(false);
//       }
//     };
    

//     fetchCartItems();
//   }, []);

//   const removeItemFromCart = async (artworkId) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://the-met-gallery-backend.onrender.com/remove_from_cart/${artworkId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setCartItems(data.cart_items);
//         setLoading(false);
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to remove item from cart:', errorData.error);
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//     setLoading(false);
//   };

//   const updateItemQuantity = async (artworkId, newQuantity) => {
//     setLoading(true);
//     if (newQuantity <= 0) return;

//     const updatedItems = cartItems.map(item =>
//       item.artwork_id === artworkId ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedItems);

//     try {

//       const response = await fetch(`https://the-met-gallery-backend.onrender.com/update_cart_item/${artworkId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           quantity: newQuantity
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setCartItems(data.cart_items);
//       }

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Failed to update item quantity:', errorData.error);
//         setCartItems(prevItems =>
//           prevItems.map(item =>
//             item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error updating item quantity:', error);
//       setCartItems(prevItems =>
//         prevItems.map(item =>
//           item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
//         )
//       );
//     }
//     setLoading(false);
//   };

//   const handleQuantityChange = (id, event) => {
//     const quantity = parseInt(event.target.value, 10);
//     if (!isNaN(quantity) && quantity > 0) {
//       updateItemQuantity(id, quantity);
//     } else {
//       console.warn('Invalid quantity:', quantity);
//     }
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.artwork.price), 0).toFixed(2);
//   };

//   const handleProceedToCheckout = () => {
//     navigate('/checkout', { state: { pCartItems: cartItems, pTotalAmount: calculateTotalPrice() } });
//   };

//   if (loading) return <Loading />

//   return (
//     <div className="cart-page">
//       <h1 className="page-title">Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <p className="empty-cart-message">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
//       ) : (
//         <div className="cart-items-container">
//           {cartItems.map(item => (
//             <div key={item.artwork_id} className="cart-item-card">
//               <div className="cart-item-image">
//                 <img src={item.artwork.image} alt={item.artwork.title} />
//               </div>
//               <div className="cart-item-details">
//                 <h2 className="item-title">{item.artwork.title}</h2>
//                 <p className="item-description">{item.artwork.description}</p>
//                 <p className="item-price">Price: Ksh {item.artwork.price}</p>
//                 <div className="quantity-container">
//                   <label htmlFor={`quantity-${item.artwork_id}`}>Quantity:</label>
//                   <input
//                     id={`quantity-${item.artwork_id}`}
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(item.artwork_id, e)}
//                     className="quantity-input"
//                     min="1"
//                   />
//                 </div>
//                 <button onClick={() => removeItemFromCart(item.artwork_id)} className="remove-item-button">Remove</button>
//               </div>
//             </div>
//           ))}
//           <div className="cart-summary">
//             <h2>Total: Ksh {calculateTotalPrice()}</h2>
//             <button onClick={handleProceedToCheckout} className="checkout-button">Proceed to Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import Loading from './Loading';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://the-met-gallery-backend.onrender.com/view_cart');

        if (!response.ok) {
          throw new Error('Cart not found');
        }

        const data = await response.json();
        setCartItems(data.cart_items);
      } catch (error) {
        console.error('Failed to fetch cart items:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const removeItemFromCart = async (artworkId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://the-met-gallery-backend.onrender.com/remove_from_cart/${artworkId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart_items);
      } else {
        const errorData = await response.json();
        console.error('Failed to remove item from cart:', errorData.error);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (artworkId, newQuantity) => {
    setLoading(true);
    if (newQuantity <= 0) return;

    const updatedItems = cartItems.map(item =>
      item.artwork_id === artworkId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);

    try {
      const response = await fetch(`https://the-met-gallery-backend.onrender.com/update_cart_item/${artworkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: newQuantity
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart_items);
      } else {
        const errorData = await response.json();
        console.error('Failed to update item quantity:', errorData.error);
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      updateItemQuantity(id, quantity);
    } else {
      console.warn('Invalid quantity:', quantity);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.artwork.price), 0).toFixed(2);
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Debug line
    return !!token;
  };

  const handleProceedToCheckout = () => {
    const token = localStorage.getItem('authToken');
    if (!isAuthenticated()) {
      console.log('User is not authenticated. Redirecting to login.'); // Debug line
      localStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/login');
    } else {
      console.log('User is authenticated. Proceeding to checkout.'); // Debug line
      navigate('/checkout', { state: { pCartItems: cartItems, pTotalAmount: calculateTotalPrice() } });
    }
  };

  if (loading) return <Loading />

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(item => (
            <div key={item.artwork_id} className="cart-item-card">
              <div className="cart-item-image">
                <img src={item.artwork.image} alt={item.artwork.title} />
              </div>
              <div className="cart-item-details">
                <h2 className="item-title">{item.artwork.title}</h2>
                <p className="item-description">{item.artwork.description}</p>
                <p className="item-price">Price: Ksh {item.artwork.price}</p>
                <div className="quantity-container">
                  <label htmlFor={`quantity-${item.artwork_id}`}>Quantity:</label>
                  <input
                    id={`quantity-${item.artwork_id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.artwork_id, e)}
                    className="quantity-input"
                    min="1"
                  />
                </div>
                <button onClick={() => removeItemFromCart(item.artwork_id)} className="remove-item-button">Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: Ksh {calculateTotalPrice()}</h2>
            <button onClick={handleProceedToCheckout} className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
