import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CheckoutPageModal from './components/CheckoutPageModal';
import PaymentCallback from './components/PaymentCallback';

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
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('session'));

  useEffect(() =>{
    setIsLoggedIn(!!localStorage.getItem('session'));
    console.log(!!localStorage.getItem('session'));
  },[])


  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
     <div className="app">
        <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Registration />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="/checkout" element={<CheckoutPageModal />} />
            <Route path="/tickets" element={<TicketBookingPage />} />
            <Route path="/eventcheckout" element={<TicketBookingPage />} />
            <Route path="/payment-callback" element={<PaymentCallback />} />
            <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/artworks" element={<ProtectedRoute element={<ArtworkPage addItemToCart={addItemToCart} />} />} />
            <Route path="/artworks/:id" element={<ProtectedRoute element={<ArtworkDetailsPage addItemToCart={addItemToCart} />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<CartPage cartItems={cartItems} removeItemFromCart={removeItemFromCart} updateItemQuantity={updateItemQuantity} />} />} />
            <Route path="/add-art" element={<ProtectedRoute element={isArtist ? <AddArtPage /> : <Navigate to="/login" />} />} />
            <Route path="/events" element={<ProtectedRoute element={<EventsPage events={events} />} />} />
            <Route path="/events/:eventId" element={<ProtectedRoute element={<EventDetailPage events={events} />} />} />
            <Route path="/create-event" element={<ProtectedRoute element={<CreateEventPage addEvent={addEvent} />} />} />
            <Route path="/events/:eventName/:eventId/book/:ticketPrice" element={<ProtectedRoute element={<TicketBookingPage events={events} />} />} />
            <Route path="/my-events" element={<ProtectedRoute element={<MyEventsList events={events} />} />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
};

export default App;




// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar'; // Import the Navbar component
// import ArtworkPage from './components/ArtworkPage';
// import ArtworkDetailsPage from './components/ArtworkDetailsPage';
// import CartPage from './components/CartPage';
// import AddArtPage from './components/AddArtPage'; // Import AddArtPage component
// import Footer from './components/Footer'; // Import the Footer component
// import EventsPage from './components/EventsPage';
// import EventDetailPage from './components/EventDetailPage';
// import CreateEventPage from './components/CreateEventPage';
// import TicketBookingPage from './components/TicketBookingPage';
// import MyEventsList from './components/MyEventsList';
// import Dashboard from './components/Dashboard';
// import HomePage from './components/HomePage';
// import UserProfile from './components/UserProfile';
// import Login from './components/Login'; // Import the Login component
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // Import global CSS

// // Main App Component
// const App = () => {
//   const [events, setEvents] = useState([
//     // Sample Event Data
//     {  
//       id: 1,
//       name: 'Art Expo',
//       details: 'An amazing art expo showcasing contemporary artworks from renowned artists.',
//       image: 'https://i.pinimg.com/564x/4d/7c/46/4d7c4673fdc622d124962b5ee7a146b5.jpg',
//       location: 'City Ground',
//       eventWebsite: 'https://www.eventbrite.com/',
//       startTime: '2024-08-01T10:00',
//       endTime: '2024-08-01T18:00',
//       ticketPrice: 500 
//     },
//     // Add other event objects as needed
//   ]);

//   const [cartItems, setCartItems] = useState([]);
//   const [isArtist, setIsArtist] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('session'));

//   // Event management functions
//   const addEvent = (newEvent) => {
//     setEvents([...events, { ...newEvent, id: events.length + 1 }]);
//   };

//   // Cart management functions
//   const addItemToCart = (item) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         return prevItems.map((cartItem) =>
//           cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
//         );
//       }
//       return [...prevItems, { ...item, quantity: 1 }];
//     });
//   };

//   const removeItemFromCart = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const updateItemQuantity = (id, quantity) => {
//     if (quantity <= 0) return;
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   // Authentication handling
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   // Protected Route Component
//   const ProtectedRoute = ({ element }) => {
//     return isLoggedIn ? element : <Navigate to="/" />;
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} /> {/* Pass cartItemsCount and isArtist to Navbar */}
//         <main>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Login onLogin={handleLogin} />} />
//             <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
//             <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
//             <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

//             {/* Event Management Routes */}
//             <Route path="/events" element={<EventsPage events={events} />} />
//             <Route path="/events/:eventId" element={<EventDetailPage events={events} />} />
//             <Route path="/create-event" element={<CreateEventPage addEvent={addEvent} />} />
//             <Route path="/events/:eventId/book" element={<TicketBookingPage events={events} />} />
//             <Route path="/my-events" element={<MyEventsList events={events} />} />

//             {/* Art Management Routes */}
//             <Route path="/artworks" element={<ArtworkPage addItemToCart={addItemToCart} />} />
//             <Route path="/artworks/:id" element={<ArtworkDetailsPage addItemToCart={addItemToCart} />} />
//             <Route path="/cart" element={<CartPage cartItems={cartItems} removeItemFromCart={removeItemFromCart} updateItemQuantity={updateItemQuantity} />} />
//             <Route path="/add-art" element={isArtist ? <AddArtPage /> : <Navigate to="/" replace />} /> {/* Redirect if not an artist */}

//             {/* Redirect all other paths to the login page */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </main>
//         <Footer /> {/* Include the Footer component here */}
//       </div>
//     </Router>
//   );
// };

// export default App;
