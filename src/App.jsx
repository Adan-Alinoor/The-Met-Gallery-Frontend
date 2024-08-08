// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import ArtworkPage from './components/ArtworkPage';
import ArtworkDetailsPage from './components/ArtworkDetailsPage';
import CartPage from './components/CartPage';
import AddArtPage from './components/AddArtPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import EventsPage from './components/EventsPage';
import EventDetailPage from './components/EventDetailPage';
import CreateEventPage from './components/CreateEventPage';
import TicketBookingPage from './components/TicketBookingPage';
import MyEventsList from './components/MyEventsList';

const App = () => {
  const [events, setEvents] = useState([
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

  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        
        {/* Event Management Routes */}
        <Route path="/events" element={isLoggedIn ? <EventsPage events={events} /> : <Navigate to="/" />} />
        <Route path="/events/:eventId" element={isLoggedIn ? <EventDetailPage events={events} /> : <Navigate to="/" />} />
        <Route path="/create-event" element={isLoggedIn ? <CreateEventPage addEvent={addEvent} /> : <Navigate to="/" />} />
        <Route path="/events/:eventId/book" element={isLoggedIn ? <TicketBookingPage events={events} /> : <Navigate to="/" />} />
        <Route path="/my-events" element={isLoggedIn ? <MyEventsList events={events} /> : <Navigate to="/" />} />
        
        {/* Art Management Routes */}
        <Route path="/artworks" element={isLoggedIn ? <ArtworkPage addItemToCart={addItemToCart} /> : <Navigate to="/" />} />
        <Route path="/artworks/:id" element={isLoggedIn ? <ArtworkDetailsPage addItemToCart={addItemToCart} /> : <Navigate to="/" />} />
        <Route path="/cart" element={isLoggedIn ? <CartPage cartItems={cartItems} removeItemFromCart={removeItemFromCart} updateItemQuantity={updateItemQuantity} /> : <Navigate to="/" />} />
        <Route path="/add-art" element={isLoggedIn && isArtist ? <AddArtPage /> : <Navigate to="/" />} />
        
        {/* Redirect all other paths to the login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
