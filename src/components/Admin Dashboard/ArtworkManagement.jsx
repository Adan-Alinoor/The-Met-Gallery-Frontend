import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArtworkDetailsModal from './ArtworkDetailModel';

const ArtworkManagement = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [action, setAction] = useState('Add');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCloseAdd = () => setShowAddModal(false);
  const handleCloseUpdate = () => setShowUpdateModal(false);
  const handleDetailsClose = () => setDetailsShow(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchArtworks = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    try {
      const response = await axios.get('http://localhost:5555/artworks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sortedArtworks = response.data.sort((a, b) => a.title.localeCompare(b.title));
      setArtworks(sortedArtworks);
      setFilteredArtworks(sortedArtworks);
    } catch (error) {
      toast.error('Error fetching artworks.');
      console.error('Error fetching artworks:', error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    const results = artworks.filter((artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtworks(results);
  }, [searchTerm, artworks]);

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    const newArtwork = {
      title: selectedArtwork.title,
      artist: selectedArtwork.artist,
      description: selectedArtwork.description,
      image: selectedArtwork.image,
      price: parseFloat(selectedArtwork.price),
      status: selectedArtwork.status,
    };

    try {
      await axios.post('http://localhost:5555/artworks', newArtwork, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Artwork added successfully!');
      fetchArtworks();
      handleCloseAdd();
    } catch (error) {
      toast.error('Error adding artwork.');
      console.error('Error adding artwork:', error);
    }
  };

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    const updatedArtwork = {
      title: selectedArtwork.title,
      artist: selectedArtwork.artist,
      description: selectedArtwork.description,
      image: selectedArtwork.image,
      price: parseFloat(selectedArtwork.price),
      status: selectedArtwork.status,
    };

    try {
      await axios.put(`http://localhost:5555/artworks/${selectedArtworkId}`, updatedArtwork, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Artwork updated successfully!');
      fetchArtworks();
      handleCloseUpdate();
    } catch (error) {
      toast.error('Error updating artwork.');
      console.error('Error updating artwork:', error);
    }
  };

  const handleDelete = async (artworkId) => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    try {
      await axios.delete(`http://localhost:5555/artworks/${artworkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Artwork deleted successfully!');
      setArtworks(artworks.filter((artwork) => artwork.id !== artworkId));
    } catch (error) {
      toast.error('Error deleting artwork.');
      console.error('Error deleting artwork:', error);
    }
  };

  const handleViewClick = async (artworkId) => {
    setSelectedArtworkId(artworkId);
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session && session.accessToken;

    try {
      const response = await axios.get(`http://localhost:5555/artworks/${artworkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedArtwork(response.data);
      setDetailsShow(true);
    } catch (error) {
      toast.error('Error fetching artwork details.');
      console.error('Error fetching artwork details:', error);
    }
  };

  const handleEditClick = async (artworkId) => {
    setAction('Edit');
    await handleViewClick(artworkId);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      <Button variant="primary" onClick={() => { setAction('Add'); setShowAddModal(true); }}>Add Artwork</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredArtworks.map((artwork) => (
            <tr key={artwork.id}>
              <td>{artwork.title}</td>
              <td>{artwork.price}</td>
              <td>
                <Button variant="info" onClick={() => handleViewClick(artwork.id)}>View</Button>
                <Button variant="warning" className="ml-2" onClick={() => handleEditClick(artwork.id)}>Edit</Button>
                <Button variant="danger" className="ml-2" onClick={() => handleDelete(artwork.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Artwork Modal */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
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
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={selectedArtwork?.description || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, description: e.target.value })}
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={selectedArtwork?.image || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, image: e.target.value })}
                placeholder="Enter image URL"
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
            <Button variant="primary" type="submit">
              Add Artwork
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Update Artwork Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdate}>
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
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={selectedArtwork?.description || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, description: e.target.value })}
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={selectedArtwork?.image || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, image: e.target.value })}
                placeholder="Enter image URL"
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
            <Button variant="primary" type="submit">
              Update Artwork
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Artwork Details Modal */}
      {selectedArtworkId && (
        <ArtworkDetailsModal
          show={detailsShow}
          onHide={handleDetailsClose}
          artworkId={selectedArtworkId}
        />
      )}

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ArtworkManagement;
