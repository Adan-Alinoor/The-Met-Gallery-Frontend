import React, { useState } from 'react';
import './AddArtPage.css'; // Import CSS for this component

const AddArtPage = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newArtwork = { title, artist, description, price, image };

    // TODO: Send `newArtwork` to backend API
    console.log('New artwork submitted:', newArtwork);

    // Clear the form after submission
    setTitle('');
    setArtist('');
    setDescription('');
    setPrice('');
    setImage(null);
  };

  return (
    <div className="add-art-container">
      <h1>Add New Artwork</h1>
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
          Artist:
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
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
