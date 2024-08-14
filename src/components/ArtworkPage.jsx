import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ArtworkPage.css';
import config from '../config';

const ArtworkPage = () => {
  const [artworks, setArtworks] = useState([]); // State to store artworks data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage any errors
  const navigate = useNavigate(); // Hook to programmatically navigate

  const fetchArtworks = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token=session && session.accessToken
    console.log('Retrieved token:', token); // Debugging: check the retrieved token
  
    if (!token) {
      // If there's no token, redirect to login
      navigate('/');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5555/artworks', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'METHOD': 'GET',
        }
      });
  
      if (!response.ok) {
        console.log('Response status:', response.status); // Debugging: check response status
        if (response.status === 401) {
          // If unauthorized, redirect to login
          navigate('/');
        } else {
          throw new Error('Failed to fetch artworks');
        }
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
  }, []); // Empty dependency array means this effect runs once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Artwork Gallery</h1>
      <div className="card-gallery">
        {artworks.map(artwork => (
          <div key={artwork.id} className="card">
            <Link to={`/artworks/${artwork.id}`} className="card-link">
              <img src={artwork.image} alt={artwork.title} className="card-image" />
              <div className="card-overlay">
                <h2>{artwork.title}</h2>
                <p>{artwork.price}</p>
                <Link to={`/artworks/${artwork.id}`} className="view-more">View More</Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkPage;
