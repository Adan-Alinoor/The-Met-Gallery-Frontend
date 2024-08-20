import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArtworkDetailsModal = ({ show, onHide, artworkId }) => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        const token = session?.accessToken;

        const response = await fetch(`https://the-met-gallery-backend.onrender.com/${artworkId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch artwork');
        }

        const data = await response.json();
        setArtwork(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (artworkId) {
      fetchArtwork();
    }
  }, [artworkId]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{loading ? 'Loading...' : artwork?.title || 'Artwork Details'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p className="text-danger">Error: {error}</p>
        ) : (
          <>
            <img 
              src={artwork?.image} 
              alt={artwork?.title} 
              className="img-fluid mb-3" 
              style={{ maxHeight: '300px', objectFit: 'cover' }} 
            />
            <p><strong>Description:</strong> {artwork?.description}</p>
            <p><strong>Price:</strong> Ksh {artwork?.price}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArtworkDetailsModal;
