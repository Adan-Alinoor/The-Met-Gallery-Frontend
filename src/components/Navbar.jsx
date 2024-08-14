import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import './Navbar.css';

const Navbar = ({ cartItemsCount, isArtist }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Art Gallery</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/artworks">Artworks</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/events">Events</Link>
          </li>
          {isArtist && (
            <li className="nav-item">
              <Link className="nav-link" to="/add-art">Add Art</Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <FaShoppingCart className="cart-icon" />
              {cartItemsCount > 0 && <Badge pill variant="info" className="cart-badge">{cartItemsCount}</Badge>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">User Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/messages">Messages</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
