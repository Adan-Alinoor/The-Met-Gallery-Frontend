import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ArtworkDetailsModal = ({ show, onHide, artworkId }) => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        const token = session?.accessToken;

        const response = await fetch(`http://127.0.0.1:5555/artworks/${artworkId}`, {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{artwork?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={artwork?.image} alt={artwork?.title} className="img-fluid" />
        <p><strong>Description:</strong> {artwork?.description}</p>
        <p><strong>Price:</strong> Ksh {artwork?.price}</p>
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

