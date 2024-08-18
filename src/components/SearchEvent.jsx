import React from 'react';
import './SearchEvent.css';  

function SearchEvent({ searchEvent, setSearchEvent }) {
  return (
    <div className="search-event-container">
      <h2>Search Events:</h2>
      <div className="search-input-container">
        <input 
          className="search-input"
          value={searchEvent}
          onChange={(e) => setSearchEvent(e.target.value)}
          type="text"  
          placeholder="Search for an Event..."
        />
      </div>
    </div>
  );
}

export default SearchEvent;
