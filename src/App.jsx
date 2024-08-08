import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import EventDetailPage from './components/EventDetailPage';
import CreateEventPage from './components/CreateEventPage';
import TicketBookingPage from './components/TicketBookingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
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
    {
      id: 2,
      name: 'Gallery Night',
      details: 'An exclusive gallery night with curated exhibitions and special guest appearances.',
      image: 'https://i.pinimg.com/736x/d3/de/6d/d3de6d10d31e9f262a2a8391ae07a5b6.jpg',
      location: 'City Ground',
      eventWebsite: 'https://www.eventbrite.com/',
      startTime: '2024-08-01T20:00',
      endTime: '2024-08-01T22:00',
      ticketInfo: 'Tickets available at https://www.eventbrite.com/',
      ticketPrice: 800 
    },
    {
      id: 3,
      name: 'Summer Music Festival',
      details: 'A vibrant summer music festival featuring performances by popular bands and solo artists.',
      image: 'https://i.pinimg.com/564x/d3/08/15/d308155afd4ec022e7b450dedda265b6.jpg',
      location: 'Outdoor Arena',
      eventWebsite: 'https://www.example.com/',
      startTime: '2024-09-15T14:00',
      endTime: '2024-09-15T22:00',
      ticketPrice: 600
    },
    {
      id: 4,
      name: 'Tech Conference 2024',
      details: 'An industry-leading conference focused on the latest trends in technology and innovation.',
      image: 'https://i.pinimg.com/564x/d5/ee/92/d5ee920aec29a4306fbafff16db4790d.jpg',
      location: 'Convention Center',
      eventWebsite: 'https://www.techconference.com/',
      startTime: '2024-10-01T09:00',
      endTime: '2024-10-01T17:00',
      ticketPrice: 700
    },
    {
      id: 5,
      name: 'Outdoor Yoga Retreat',
      details: 'A serene yoga retreat in nature, ideal for relaxation and rejuvenation.',
      image: 'https://i.pinimg.com/564x/9d/bf/d0/9dbfd05de64d8621995e29f5d3df9201.jpg',
      location: 'Mountain Retreat',
      eventWebsite: 'https://www.yogaretreat.com/',
      startTime: '2024-10-15T08:00',
      endTime: '2024-10-15T12:00',
      ticketPrice: 300
    },
    {
      id: 6,
      name: 'Food Truck Festival',
      details: 'An exciting festival featuring a variety of gourmet food trucks offering diverse cuisines.',
      image: 'https://i.pinimg.com/564x/1b/7c/81/1b7c816710d9f252985c7afec20d214d.jpg',
      location: 'Downtown Plaza',
      eventWebsite: 'https://www.foodtruckfestival.com/',
      startTime: '2024-11-01T11:00',
      endTime: '2024-11-01T20:00',
      ticketPrice: 100
    },
    {
      id: 7,
      name: 'Wine Tasting Evening',
      details: 'An elegant evening of wine tasting featuring a selection of fine wines and pairings.',
      image: 'https://i.pinimg.com/564x/49/7a/21/497a21cb8b923f78071708bc6986dca3.jpg',
      location: 'Vineyard Hall',
      eventWebsite: 'https://www.winetastingevent.com/',
      startTime: '2024-11-15T18:00',
      endTime: '2024-11-15T21:00',
      ticketPrice: 400
    },
    {
      id: 8,
      name: 'DIY Craft Workshop',
      details: 'A hands-on workshop where you can create your own crafts and learn new techniques.',
      image: 'https://i.pinimg.com/736x/c2/81/cb/c281cb9df82b86eab924b209603cd5c7.jpg',
      location: 'Community Center',
      eventWebsite: 'https://www.craftworkshop.com/',
      startTime: '2024-12-01T10:00',
      endTime: '2024-12-01T15:00',
      ticketPrice: 150
    },
    {
      id: 9,
      name: 'Comedy Night',
      details: 'A night of laughter with performances by well-known comedians and emerging talents.',
      image: 'https://i.pinimg.com/564x/fd/ad/66/fdad6614e3c804179baf6a4df6d0e39d.jpg',
      location: 'Comedy Club',
      eventWebsite: 'https://www.comedynight.com/',
      startTime: '2024-12-10T20:00',
      endTime: '2024-12-10T22:00',
      ticketPrice: 200
    },
    {
      id: 10,
      name: 'Historical Walking Tour',
      details: 'A guided tour exploring the rich history and landmarks of our city.',
      image: 'https://i.pinimg.com/736x/46/de/e4/46dee4d405cdf13e7b9bdc7d89f0b2d2.jpg',
      location: 'City Hall',
      eventWebsite: 'https://www.historicaltour.com/',
      startTime: '2024-12-20T09:00',
      endTime: '2024-12-20T12:00',
      ticketPrice: 250
    },
    {
      id: 11,
      name: 'Science Fair',
      details: 'A fair showcasing innovative science projects and experiments by students and researchers.',
      image: 'https://i.pinimg.com/564x/0d/60/59/0d60597ab8cb15d18e6b9479eb545c48.jpg',
      location: 'Science Museum',
      eventWebsite: 'https://www.sciencefair.com/',
      startTime: '2025-01-15T10:00',
      endTime: '2025-01-15T16:00',
      ticketPrice: 300
    },
    {
      id: 12,
      name: 'Winter Wonderland Market',
      details: 'A festive market featuring holiday-themed goods, crafts, and seasonal treats.',
      image: 'https://i.pinimg.com/564x/d8/90/71/d890716fca6befe50f7517862ba036b5.jpg',
      location: 'City Park',
      eventWebsite: 'https://www.wintermarket.com/',
      startTime: '2025-01-25T11:00',
      endTime: '2025-01-25T19:00',
      ticketPrice: 100
    }
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage events={events} />} />
        <Route path="/events" element={<EventsPage events={events} />} />
        <Route path="/events/:eventId" element={<EventDetailPage events={events} />} />
        <Route path="/create-event" element={<CreateEventPage addEvent={addEvent} />} />
        <Route path="/events/:eventId/book" element={<TicketBookingPage events={events} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my-events" element={<MyEventsList events={events} />} />
      </Routes>
    </Router>
  );
};

export default App;

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


import React from 'react'
import Dashboard from './components/Dashboard'

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (

    <>
  
    <div><Dashboard/></div>
    </>
    
  )
}

export default App



    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />}
        />

        {/* Redirect all other paths to the login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


