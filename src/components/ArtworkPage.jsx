

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArtworkPage.css';
import SearchArt from './SearchArt';
import Loading from './Loading';

const ArtworkCard = ({ artwork }) => (
  <div key={artwork.id} className="col-md-3 col-sm-4 mb-4 artwork-card-wrapper">
    <Link to={`/artworks/${artwork.id}`} className="text-decoration-none">
      <div className="artwork-card">
        <div className="artwork-card-image">
          <img src={artwork.image} alt={artwork.title} className="artwork-img" />
          <div className="artwork-overlay">
            <div className="overlay-content">
              <h5 className="overlay-title">{artwork.title}</h5>
              <p className="overlay-price">{artwork.price}</p>
              <div className="btn btn-custom">View More</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const ArtworkPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchArt, setSearchArt] = useState('');

  const fetchArtworks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://the-met-gallery-backend.onrender.com/artworks');

      if (!response.ok) {
        throw new Error('Failed to fetch artworks');
      }

      const data = await response.json();
      setArtworks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  const filteredArts = artworks.filter((artwork) =>
    artwork?.title?.toLowerCase().includes(searchArt.toLowerCase())
  );

  return (
    <div className="container-fluid gallery-background">
      <div className="container my-4">
        <h1 className="text-center mb-4 text-light">Artwork Gallery</h1>
        <SearchArt setSearchArt={setSearchArt} searchArt={searchArt} />
        <div className="row">
          {filteredArts.map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkPage;

