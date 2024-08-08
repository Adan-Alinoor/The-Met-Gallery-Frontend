import React, { useState } from 'react';
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

// Main App Component
const App = () => {
  const [events, setEvents] = useState([
    // Event data here (same as provided in the question)
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
      <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />

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
    </Router>
  );
};

export default App;
