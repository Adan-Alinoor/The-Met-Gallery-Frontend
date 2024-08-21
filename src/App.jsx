import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArtworkPage from './components/ArtworkPage';
import ArtworkDetailsPage from './components/ArtworkDetailsPage';
import CartPage from './components/CartPage';
import AddArtPage from './components/AddArtPage';
import Footer from './components/Footer';
import EventsPage from './components/EventsPage';
import EventDetailPage from './components/EventDetailPage';
import CreateEventPage from './components/CreateEventPage';
import TicketBookingPage from './components/TicketBookingPage';
import MyEventsList from './components/MyEventsList';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import Messaging from './components/Messaging';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CheckoutPage from './components/CheckoutPage';
import PaymentCallback from './components/PaymentCallback';
import MyBookings from './components/MyBookings';
import DashboardOverview from './components/Admin Dashboard/DashboardOverview';
import EventManagement from './components/Admin Dashboard/EventManagement';
import ArtworkManagement from './components/Admin Dashboard/ArtworkManagement';
import OrdersTickets from './components/Admin Dashboard/OrdersTickets';
import UserPage from './components/Admin Dashboard/UserPage';
import SideNavbar from './components/Admin Dashboard/SideNavbar';
import { AuthProvider } from './components/AuthContext';

import VerifyEmail from './components/VerifyEmail';
import { io } from 'socket.io-client';

const socket = io('https://the-met-gallery-backend.onrender.com', {
  transports: ['websocket'],
});



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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('session'));

  useEffect(() =>{
    setIsLoggedIn(!!localStorage.getItem('session'));
    console.log(!!localStorage.getItem('session'));
  },[]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  // const removeItemFromCart = (id) => {
  //   setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  // };

  // const updateItemQuantity = (id, quantity) => {
  //   if (quantity <= 0) return;
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity } : item
  //     )
  //   );
  // };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const ProtectedRoute = ({ element }, admin) => {
    if (admin === 'true') {
      const session = JSON.parse(localStorage.getItem('session'));
      const user = session?.user;
      return isLoggedIn && user.role === 'admin' ? element : <Navigate to="/login" />;
    }
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  const location = useLocation();
  const showNavbar = !location.pathname.startsWith('/dashboard');
  const showFooter = !location.pathname.startsWith('/dashboard');
  const showSidebar = location.pathname.startsWith('/dashboard');

  return (
    <div className="app">
      {showNavbar && <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} />}
      {showSidebar && <SideNavbar />}
      <main style={{ marginLeft: showSidebar ? '250px' : '0', padding: '20px' }}>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Registration />} />

          {/* Protected Routes */}
          <Route path="/dashboard/overview" element={<ProtectedRoute element={<DashboardOverview />} admin='true' />} />
          <Route path="/dashboard/EventManagement" element={<ProtectedRoute element={<EventManagement />} admin='true' />} />
          <Route path="/dashboard/ArtworkManagement" element={<ProtectedRoute element={<ArtworkManagement />} admin='true' />} />
          <Route path="/dashboard/Ordertickets" element={<ProtectedRoute element={<OrdersTickets />} admin='true' />} />
          <Route path="/dashboard/users" element={<ProtectedRoute element={<UserPage />} admin='true' />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/messages" element={<ProtectedRoute element={<Messaging />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
          <Route path="/artworks" element={<ArtworkPage />} />
          <Route path="/artworks/:id" element={<ArtworkDetailsPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/add-art" element={<ProtectedRoute element={isArtist ? <AddArtPage /> : <Navigate to="/login" />} />} />
          <Route path="/events" element={<EventsPage events={events} />} />
          <Route path="/events/:eventId" element={<EventDetailPage events={events} />} />
          <Route path="/create-event" element={<ProtectedRoute element={<CreateEventPage addEvent={addEvent} />} />} />
          <Route path="/events/:eventName/:eventId/book" element={<TicketBookingPage events={events} />} />
          <Route path="/my-events" element={<ProtectedRoute element={<MyEventsList events={events} />} />} />
          <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings />} />} />
          <Route path="/verify/:token" component={VerifyEmail} />

          {/* Fallback Route */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </AuthProvider>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
