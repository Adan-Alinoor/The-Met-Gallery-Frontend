import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
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
              Cart <Badge pill variant="info">{cartItemsCount}</Badge>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">User Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css'; // Import component-specific CSS

// const Navbar = ({ cartItemsCount, isArtist }) => {
//   return (
//     <nav className="navbar">
//       <div className="nav-logo">The Met Gallery</div>
//       <ul className="nav-links">
//         <li><Link to="/artworks">Artwork</Link></li>
//         <li>
//           <Link to="/cart" className="cart-link">
//             <span className="cart-icon">🛒</span>
//             {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
//           </Link>
//         </li>
//         <li><Link to="/checkout">Checkout</Link></li>
//         <li><Link to="/events">Events</Link></li>
//         <li><Link to="/settings">Settings</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         {isArtist && (
//           <li><Link to="/add-art">Add Art</Link></li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
