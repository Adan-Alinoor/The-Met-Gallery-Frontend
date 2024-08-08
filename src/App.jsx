// src/App.jsx

import React, { useState } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import ArtworkPage from './components/ArtworkPage';
import ArtworkDetailsPage from './components/ArtworkDetailsPage';
import CartPage from './components/CartPage';
import AddArtPage from './components/AddArtPage'; // Import AddArtPage component
import Footer from './components/Footer'; // Import the Footer component
import './App.css'; // Import global CSS
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'; 

// Import components
import Navbar from './components/Navbar';
import EventsPage from './components/EventsPage';
import EventDetailPage from './components/EventDetailPage';
import CreateEventPage from './components/CreateEventPage';
import TicketBookingPage from './components/TicketBookingPage';
import LoginPage from './components/LoginPage';
import MyEventsList from './components/MyEventsList';
import ArtworkPage from './components/ArtworkPage';
import ArtworkDetailsPage from './components/ArtworkDetailsPage';
import CartPage from './components/CartPage';
import AddArtPage from './components/AddArtPage';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
>>>>>>> 4d1c0fb5824411d1f1692656d6a589b4d1ce27c7

// Main App Component
const App = () => {
  const [events, setEvents] = useState([
    // Sample Event Data
    {  
      id: 1,
      name: 'Art Expo',
      details: 'An amazing art expo showcasing contemporary artworks from renowned artists.',
      image: 'https://i.pinimg.com/564x/4d/7c/46/4d7c4673fdc622d124962b5ee7a146b5.jpg',
      location: 'City Ground',
      eventWebsite: 'https://www.eventbrite.com/',
      startTime: '2024-08-01T10:00',
      endTime: '2024-08-01T18:00',
      ticketPrice: 500 
    },
    // Add other event objects as needed
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [isArtist, setIsArtist] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Event management functions
  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  // Cart management functions
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Authentication handling
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
<<<<<<< HEAD
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
            <Route
              path="/add-art"
              element={isArtist ? <AddArtPage /> : <Navigate to="/" replace />} // Redirect if not an artist
            />
            {/* Optionally add a route for not-authorized */}
            <Route path="/not-authorized" element={<div>This page is only available to artists. Please log in with an artist account to access this feature.</div>} />
          </Routes>
        </main>
        <Footer /> {/* Include the Footer component here */}
      </div>
=======
      <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Event Management Routes */}
        <Route path="/events" element={<EventsPage events={events} />} />
        <Route path="/events/:eventId" element={<EventDetailPage events={events} />} />
        <Route path="/create-event" element={<CreateEventPage addEvent={addEvent} />} />
        <Route path="/events/:eventId/book" element={<TicketBookingPage events={events} />} />
        <Route path="/my-events" element={<MyEventsList events={events} />} />

        {/* Art Management Routes */}
        <Route path="/artworks" element={<ArtworkPage addItemToCart={addItemToCart} />} />
        <Route path="/artworks/:id" element={<ArtworkDetailsPage addItemToCart={addItemToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeItemFromCart={removeItemFromCart} updateItemQuantity={updateItemQuantity} />} />
        <Route path="/add-art" element={<AddArtPage />} />

        {/* Redirect all other paths to the login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
>>>>>>> 4d1c0fb5824411d1f1692656d6a589b4d1ce27c7
    </Router>
  );
};

export default App;
