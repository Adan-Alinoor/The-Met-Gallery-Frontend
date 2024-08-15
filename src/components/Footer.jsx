import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import MessageModal from './MessageModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
            <div className="col-md-6 text-center">
              <a href="#messages" className="footer-link" onClick={openModal}>
                <div className="chat-container">
                  <FaCommentDots className="chat-icon" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <MessageModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Footer;
