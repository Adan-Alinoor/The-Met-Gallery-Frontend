

// import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import './AddArtPage.css';

// const AddArtPage = ({ onNewArtwork = () => {} }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');
//   const [notification, setNotification] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!title || !description || !price || !image) {
//       setNotification('Please fill out all fields.');
//       return;
//     }

//     const newArtwork = {
//       title,
//       description,
//       price: parseFloat(price), // Ensure price is a number
//       image
//     };
//     console.log("Submitting Artwork:", newArtwork);

//     const session = JSON.parse(localStorage.getItem("session"));
//     const token = session?.accessToken;

//     try {
//       const response = await fetch('https://the-met-gallery-backend.onrender.com/artworks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Ensure correct token retrieval
//         },
//         body: JSON.stringify(newArtwork)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Artwork created:', data.artwork);

//         onNewArtwork(data.artwork);

//         setNotification('Artwork added successfully!');

//         setTimeout(() => {
//           console.log('Redirecting to:', `/artworks/${data.artwork.id}`);
//           navigate(`/artworks/${data.artwork.id}`);
//         }, 1000);
//       } else {
//         const errorData = await response.json();
//         setNotification(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error('Error submitting artwork:', error);
//       setNotification('An error occurred while submitting the artwork.');
//     }
//   };

//   return (
//     <div className="add-art-container">
//       <h1>Add New Artwork</h1>
//       {notification && <div className="notification">{notification}</div>}
//       <form onSubmit={handleSubmit} className="add-art-form">
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </label>
        
//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Price (Ksh):
//           <input
//             type="text"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Image URL:
//           <input
//             type="text"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Submit Artwork</button>
//       </form>
//     </div>
//   );
// };

// // Define PropTypes for validation
// AddArtPage.propTypes = {
//   onNewArtwork: PropTypes.func
// };

// export default AddArtPage;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AddArtPage.css';

const AddArtPage = ({ onNewArtwork = () => {} }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [notification, setNotification] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in by default
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;
    
    // Check if the token is present
    if (!token) {
      setIsLoggedIn(false);
      setNotification('You must be logged in to add artwork.');
      // Redirect to login page or handle as needed
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !price || !image) {
      setNotification('Please fill out all fields.');
      return;
    }

    if (!isLoggedIn) {
      setNotification('You must be logged in to add artwork.');
      return;
    }

    const newArtwork = {
      title,
      description,
      price: parseFloat(price),
      image
    };
    console.log("Submitting Artwork:", newArtwork);

    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    try {
      const response = await fetch('https://the-met-gallery-backend.onrender.com/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newArtwork)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Artwork created:', data.artwork);

        onNewArtwork(data.artwork);

        setNotification('Artwork added successfully!');

        setTimeout(() => {
          console.log('Redirecting to:', `/artworks/${data.artwork.id}`);
          navigate(`/artworks/${data.artwork.id}`);
        }, 1000);
      } else {
        const errorData = await response.json();
        setNotification(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting artwork:', error);
      setNotification('An error occurred while submitting the artwork.');
    }
  };

  return (
    <div className="add-art-container">
      <h1>Add New Artwork</h1>
      {notification && <div className="notification">{notification}</div>}
      {isLoggedIn && (
        <form onSubmit={handleSubmit} className="add-art-form">
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Price (Ksh):
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit Artwork</button>
        </form>
      )}
    </div>
  );
};

// Define PropTypes for validation
AddArtPage.propTypes = {
  onNewArtwork: PropTypes.func
};

export default AddArtPage;


