import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="footer-text">
                <a href="mailto:metgallery.ke@gmail.com" className="footer-email">Email: metgallery.ke@gmail.com</a>
              </p>
              <p className="footer-text">Phone: (254) 456-7890</p>
              <p className="footer-text">Address: P.O.BOX 13505-0400</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
