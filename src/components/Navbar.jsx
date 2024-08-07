// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import component-specific CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">The Met Gallery</div>
      <ul className="nav-links">
        <li><Link to="/">Artwork</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
