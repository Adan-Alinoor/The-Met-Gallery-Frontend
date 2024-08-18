import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArtworkDetailsModal from './ArtworkDetailModel';
import './ArtworkManagement.css';
import { FaList, FaTh } from "react-icons/fa";

const ArtworkManagement = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [detailsShow, setDetailsShow] = useState(false);
  const [action, setAction] = useState('Add');
  const [selectedArtwork, setSelectedArtwork] = useState({});
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('list'); // Added state for view mode

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
    setCurrentPage(1); // Reset to first page on search
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
    const token = session?.accessToken;

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

  const getPaginatedArtworks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredArtworks.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? 'primary' : 'secondary'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div>
      <Card className="controls-card">
        <Card.Body>
          <Button variant="primary" onClick={() => { setAction('Add'); setShowAddModal(true); }}>Add Artwork</Button>
          <div className="view-toggle-buttons">
            <Button
              className={`view-toggle-button ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaList /> List View
            </Button>
            <Button
              className={`view-toggle-button ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh /> Grid View
            </Button>
          </div>
          <Form.Control
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch}
            className="mt-3 search-input"
          />
        </Card.Body>
      </Card>

      {viewMode === 'list' ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedArtworks().map((artwork) => (
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
      ) : (
        <Row>
          {getPaginatedArtworks().map((artwork) => (
            <Col key={artwork.id} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={artwork.image} alt={artwork.title} />
                <Card.Body>
                  <Card.Title>{artwork.title}</Card.Title>
                  <Card.Text>{artwork.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="info" onClick={() => handleViewClick(artwork.id)}>View</Button>
                    <Button variant="warning" onClick={() => handleEditClick(artwork.id)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(artwork.id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex justify-content-center mt-4">
        {renderPagination()}
      </div>

      {/* Add Artwork Modal */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitAdd}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={selectedArtwork.title || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter artist"
                value={selectedArtwork.artist || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, artist: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={selectedArtwork.description || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={selectedArtwork.image || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, image: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={selectedArtwork.price || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter status"
                value={selectedArtwork.status || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, status: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Artwork
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Artwork Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Artwork</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdate}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={selectedArtwork.title || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter artist"
                value={selectedArtwork.artist || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, artist: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={selectedArtwork.description || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={selectedArtwork.image || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, image: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={selectedArtwork.price || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter status"
                value={selectedArtwork.status || ''}
                onChange={(e) => setSelectedArtwork({ ...selectedArtwork, status: e.target.value })}
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
      <ArtworkDetailsModal
        show={detailsShow}
        onHide={handleDetailsClose}
        artwork={selectedArtwork}
      />

      <ToastContainer />
    </div>
  );
};

export default ArtworkManagement;
