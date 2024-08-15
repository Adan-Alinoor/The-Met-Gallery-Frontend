// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AddArtPage.css';

// const AddArtPage = ({ onNewArtwork }) => {
//   const [title, setTitle] = useState('');
//   const [artist, setArtist] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');
//   const [notification, setNotification] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!title || !artist || !description || !price || !image) {
//       setNotification('Please fill out all fields.');
//       return;
//     }

//     const newArtwork = {
//       id: Date.now(), // Simple unique ID generator
//       title,
//       artist,
//       description,
//       price,
//       image
//     };

//     console.log('Submitting artwork:', newArtwork);

//     // Call the callback to update artworks in the parent component
//     onNewArtwork(newArtwork);

//     // Set the notification message
//     setNotification('Artwork added successfully!');

//     // Redirect to the artwork page after a short delay
//     setTimeout(() => {
//       console.log('Redirecting to:', `/artwork/${newArtwork.id}`);
//       navigate(`/artwork/${newArtwork.id}`);
//     }, 1000); // 1 second delay to allow the notification to be seen
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
//           Artist:
//           <input
//             type="text"
//             value={artist}
//             onChange={(e) => setArtist(e.target.value)}
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

// export default AddArtPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddArtPage.css';

const AddArtPage = ({ onNewArtwork }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !price || !image) {
      setNotification('Please fill out all fields.');
      return;
    }

    const newArtwork = {
      title,
      description,
      price: parseFloat(price), // Ensure price is a number
      image
    };
    console.log("Submitting Artwork:", newArtwork);

    try {
      const response = await fetch('http://localhost:5555/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Ensure correct token retrieval
        },
        body: JSON.stringify(newArtwork)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Artwork created:', data.artwork);

        onNewArtwork(data.artwork);

        setNotification('Artwork added successfully!');

        setTimeout(() => {
          console.log('Redirecting to:', `/artwork/${data.artwork.id}`);
          navigate(`/artwork/${data.artwork.id}`);
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
    </div>
  );
};

export default AddArtPage;
