// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import './ArtworkDetailsPage.css'; // Import component-specific CSS

// // const ArtworkDetailsPage = ({ addItemToCart }) => {
// //   const { id } = useParams();
// //   const [artwork, setArtwork] = useState(null);
// //   // const [relatedArtworks, setRelatedArtworks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);


// //   const fetchArtworks = async () => {
// //     const session = JSON.parse(localStorage.getItem('session'));
// //     const token=session && session.accessToken
// //     console.log('Retrieved token:', token); // Debugging: check the retrieved token
  
// //     if (!token) {
// //       // If there's no token, redirect to login
// //       navigate('/');
// //       return;
// //     }
  
// //     try {
// //       const response = await fetch(`http://127.0.0.1:5555/artworks/${id}`, {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
  
// //       if (!response.ok) {
// //         console.log('Response status:', response.status); // Debugging: check response status
// //         if (response.status === 401) {
// //           // If unauthorized, redirect to login
// //           navigate('/');
// //         } else {
// //           throw new Error('Failed to fetch artworks');
// //         }
// //       }
  
// //       const data = await response.json();
// //       // setArtworks(data);
// //     } catch (error) {
// //       setError(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchArtworks();
// //   }, [id])

// //   const handleAddToCart = () => {
// //     console.log('Adding item to cart:', artwork); // Debugging log
// //     addItemToCart({ ...artwork, quantity: 1 });
// //   };

// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

// //   if (error) {
// //     return <p>Error: {error}</p>;
// //   }

// //   if (!artwork) {
// //     return <p>Artwork not found.</p>;
// //   }

// //   return (
// //     <div className="details-container">
// //       <div className="cards-container">
// //         <div className="image-card">
// //           <img src={artwork.image} alt={artwork.title} className="details-image" />
// //         </div>
// //         <div className="info-card">
// //           <h1>{artwork.title}</h1>
// //           <p><strong>Description:</strong>{artwork.description}.</p>
// //           <p><strong>Price:</strong> {artwork.price}</p>
// //           <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
// //         </div>
// //       </div>

     
// //     </div>
// //   );
// // };

// // export default ArtworkDetailsPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import './ArtworkDetailsPage.css'; // Import component-specific CSS

// const ArtworkDetailsPage = ({ addItemToCart }) => {
//   const { id } = useParams();
//   const [artwork, setArtwork] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Add useNavigate for redirection

//   const fetchArtwork = async () => {
//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session && session.accessToken;
//     console.log('Retrieved token:', token); // Debugging: check the retrieved token

//     if (!token) {
//       // If there's no token, redirect to login
//       navigate('/');
//       return;
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:5555/artworks/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         console.log('Response status:', response.status); // Debugging: check response status
//         if (response.status === 401) {
//           // If unauthorized, redirect to login
//           navigate('/');
//         } else {
//           throw new Error('Failed to fetch artwork');
//         }
//       }

//       const data = await response.json();
//       setArtwork(data); // Update artwork state with the fetched data
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArtwork();
//   }, [id]);

//   const handleAddToCart = () => {
//     console.log('Adding item to cart:', artwork); // Debugging log
//     addItemToCart({ ...artwork, quantity: 1 });
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!artwork) {
//     return <p>Artwork not found.</p>;
//   }

//   return (
//     <div className="details-container">
//       <div className="cards-container">
//         <div className="image-card">
//           <img src={artwork.image} alt={artwork.title} className="details-image" />
//         </div>
//         <div className="info-card">
//           <h1>{artwork.title}</h1>
//           <p><strong>Description:</strong> {artwork.description}.</p>
//           <p><strong>Price:</strong> {artwork.price}</p>
//           <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkDetailsPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArtworkDetailsPage.css'; // Import component-specific CSS

const ArtworkDetailsPage = ({ addItemToCart }) => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchArtwork = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session && session.accessToken;

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5555/artworks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/');
        } else {
          throw new Error('Failed to fetch artwork');
        }
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
      const token = session && session.accessToken;
  
      const response = await fetch('http://127.0.0.1:5555/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: session.user.id,  // Ensure this is defined correctly
          artwork_id: artwork.id,    // Ensure `artwork.id` is correct
          quantity: 1                // Adjust if necessary
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
          <p><strong>Description:</strong> {artwork.description}.</p>
          <p><strong>Price:</strong> {artwork.price}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailsPage;









