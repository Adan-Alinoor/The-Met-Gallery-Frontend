import React, { useState } from 'react';
import { Nav, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SideNavbar.css';

const SideNavbar = () => {
  const [open, setOpen] = useState(true); // Start with the sidebar open

  return (
    <div className={`side-navbar ${open ? 'open' : 'collapsed'}`}>
      <div className="navbar-header">
        <Button
          className="navbar-toggler"
          onClick={() => setOpen(!open)}
          aria-controls="side-navbar"
          aria-expanded={open}
        >
          {open ? '<' : '>'} {/* Change symbols as needed */}
        </Button>
      </div>
      <Collapse in={open}>
        <div id="side-navbar" className="navbar-collapse">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/overview">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/ArtworkManagement">Artwork Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/EventManagement">Event Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/users">Users Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard/Ordertickets">Payments</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </Collapse>
    </div>
  );
};

export default SideNavbar;
