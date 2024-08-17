import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './ArtworkManagement.css'; // Assuming you have some styles

const ArtworkManagement = () => {
  const [artworks, setArtworks] = useState([]);
  const [show, setShow] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [action, setAction] = useState('Add');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);

  const handleClose = () => setShow(false);
  const handleDetailsClose = () => setDetailsShow(false);
  const handleShow = () => setShow(true);
  const handleDetailsShow = () => setDetailsShow(true);

  // Fetch artworks from the server
  const fetchArtworks = async () => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    try {
      const response = await axios.get('http://localhost:5555/artworks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setArtworks(response.data);
    } catch (error) {
      toast.error('Error fetching artworks.');
      console.error('Error fetching artworks:', error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  // Handle artwork submission (add/edit)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    const newArtwork = {
      title: selectedArtwork.title,
      artist: selectedArtwork.artist,
      price: parseFloat(selectedArtwork.price),
      status: selectedArtwork.status,
    };

    try {
      let response;
      if (action === 'Add') {
        response = await axios.post('http://localhost:5555/artworks', newArtwork, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Artwork added successfully!');
      } else {
        response = await axios.put(`http://localhost:5555/artworks/${selectedArtworkId}`, newArtwork, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Artwork updated successfully!');
      }

      // Update the list with the newly added/edited artwork
      fetchArtworks();
      handleClose();
    } catch (error) {
      toast.error('Error saving artwork.');
      console.error('Error saving artwork:', error);
    }
  };

  // Handle artwork deletion
  const handleDelete = async (artworkId) => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    try {
      await axios.delete(`http://localhost:5555/artworks/${artworkId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Artwork deleted successfully!');
      // Remove the deleted artwork from the list
      setArtworks(artworks.filter((artwork) => artwork.id !== artworkId));
    } catch (error) {
      toast.error('Error deleting artwork.');
      console.error('Error deleting artwork:', error);
    }
  };

  // Handle row click to show details
  const handleRowClick = async (artworkId) => {
    setSelectedArtworkId(artworkId);
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session && session.accessToken;

    try {
      const response = await axios.get(`http://localhost:5555/artworks/${artworkId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setSelectedArtwork(response.data);
      handleDetailsShow();
    } catch (error) {
      toast.error('Error fetching artwork details.');
      console.error('Error fetching artwork details:', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => { setAction('Add'); handleShow(); }}>Add Artwork</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((artwork) => (
            <tr key={artwork.id} onClick={() => handleRowClick(artwork.id)}>
              <td>{artwork.title}</td>
              <td>{artwork.price}</td>
              <td>{artwork.status}</td>
              <td>
                <Button variant="warning" onClick={() => { handleRowClick(artwork.id); setAction('Edit'); }}>Edit</Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(artwork.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Artwork Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action} Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={selectedArtwork?.title || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, title: e.target.value })}
                placeholder="Enter title"
                required
              />
            </Form.Group>
            <Form.Group controlId="formArtist">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                value={selectedArtwork?.artist || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, artist: e.target.value })}
                placeholder="Enter artist"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={selectedArtwork?.price || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, price: e.target.value })}
                placeholder="Enter price"
                required
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={selectedArtwork?.status || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {action} Artwork
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Artwork Details Modal */}
      <Modal show={detailsShow} onHide={handleDetailsClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Artwork Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArtwork && (
            <div className="details-container">
              <div className="cards-container">
                <div className="image-card">
                  <img src={selectedArtwork.image} alt={selectedArtwork.title} className="details-image" />
                </div>
                <div className="info-card">
                  <h1>{selectedArtwork.title}</h1>
                  <p><strong>Description:</strong> {selectedArtwork.description}</p>
                  <p><strong>Price:</strong> {selectedArtwork.price}</p>
                  <Button variant="primary" onClick={() => {/* Add to Cart Logic */}}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ArtworkManagement;
