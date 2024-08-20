import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArtworkDetailsPage.css';

const ArtworkDetailsPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtwork = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/artworks/${id}`);

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

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session?.accessToken;
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('https://the-met-gallery-backend.onrender.com/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          artwork_id: artwork.id,
          quantity: 1,
          user_id: session.user.id, // Ensure user_id is sent if required
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      const data = await response.json();
      console.log('Successfully added to cart:', data);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!artwork) {
    return <p>Artwork not found.</p>;
  }

  return (
    <div className="details-container">
      <div className="cards-container">
        <div className="image-card">
          <img src={artwork.image} alt={artwork.title} className="details-image" />
        </div>
        <div className="info-card">
          <h1>{artwork.title}</h1>
          <p><strong>Description:</strong> {artwork.description}</p>
          <p><strong>Price:</strong> {artwork.price}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <Link to="/cart" className="cart-link">Go to Cart</Link>
    </div>
  );
};

export default ArtworkDetailsPage;
