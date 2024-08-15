import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import './Navbar.css';

const Navbar = ({ cartItemsCount, isArtist }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand-container">
        <img 
          src="/path-to-your-logo/shopify-logo.avif"  // Replace with the path to your logo image
          alt="Shopify Logo" 
          className="navbar-logo"
        />
        <button onClick={handleHomeClick} className="navbar-title">
         The Met Gallery
        </button>
      </div>

      <div className="navbar-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/artworks" className="nav-link">Artworks</Link>
        <Link to="/events" className="nav-link">Events</Link>
        {isArtist && <Link to="/add-art" className="nav-link">Add Art</Link>}
        <Link to="/cart" className="nav-link">
          <FaShoppingCart className="cart-icon" />
          {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
        </Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/profile" className="nav-link">User Profile</Link>
        <Link to="/messages" className="nav-link">Messages</Link>
      </div>
    </nav>
  );
};

export default Navbar;
