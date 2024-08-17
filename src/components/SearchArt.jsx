

import React from 'react';
import './SearchArt.css';  

function SearchArt({ SearchArt, setSearchArt }) {
  return (
    <div className="search-art-container">
      <h2 className="search-art-title">Search Arts</h2>
      <div className="search-input-wrapper">
        <input 
          className="search-input"
          value={SearchArt}
          onChange={(e) => setSearchArt(e.target.value)}
          type="text"  
          placeholder="Search for your desired art..."
        />
      </div>
    </div>
  );
}

export default SearchArt;
