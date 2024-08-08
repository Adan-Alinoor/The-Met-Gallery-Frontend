import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import ArtworkPage from './components/ArtworkPage';
import ArtworkDetailsPage from './components/ArtworkDetailsPage';
import CartPage from './components/CartPage';
import AddArtPage from './components/AddArtPage'; // Import AddArtPage component
import './App.css'; // Import global CSS

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isArtist, setIsArtist] = useState(true); // Update this based on your logic

  // Add item to cart
  const addItemToCart = (item) => {
    console.log('Item added to cart:', item); // Debugging log
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      // Add new item to the cart
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeItemFromCart = (id) => {
    console.log('Removing item from cart:', id); // Debugging log
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update item quantity
  const updateItemQuantity = (id, quantity) => {
    console.log('Updating item quantity:', id, quantity); // Debugging log
    if (quantity <= 0) return; // Prevent setting quantity to zero or negative
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Calculate total number of items in cart
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="app">
        <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} /> {/* Pass cartItemsCount and isArtist to Navbar */}
        <main>
          <Routes>
            <Route path="/" element={<ArtworkPage addItemToCart={addItemToCart} />} />
            <Route path="/artworks/:id" element={<ArtworkDetailsPage addItemToCart={addItemToCart} />} />
            <Route
              path="/cart"
              element={<CartPage cartItems={cartItems} removeItemFromCart={removeItemFromCart} updateItemQuantity={updateItemQuantity} />}
            />
            <Route path="/add-art" element={<AddArtPage />} /> {/* Add this route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
