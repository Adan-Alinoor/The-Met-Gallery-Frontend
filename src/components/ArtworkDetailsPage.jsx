import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArtworkDetailsPage.css'; // Import component-specific CSS

const ArtworkDetailsPage = ({ addItemToCart }) => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [relatedArtworks, setRelatedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch artwork data from the backend
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5555/artworks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artwork data');
        }
        const data = await response.json();
        setArtwork(data);

        // Fetch related artworks
        const relatedResponse = await fetch('http://localhost:5000/artworks');
        if (!relatedResponse.ok) {
          throw new Error('Failed to fetch related artworks');
        }
        const relatedData = await relatedResponse.json();
        // Filter out the current artwork from the related artworks
        setRelatedArtworks(relatedData.filter((art) => art.id !== data.id));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleAddToCart = () => {
    console.log('Adding item to cart:', artwork); // Debugging log
    addItemToCart({ ...artwork, quantity: 1 });
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
          <p><strong>Description:</strong>{artwork.description}.</p>
          <p><strong>Price:</strong> {artwork.price}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

     
    </div>
  );
};

export default ArtworkDetailsPage;






