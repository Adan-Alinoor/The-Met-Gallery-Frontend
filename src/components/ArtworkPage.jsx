

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ArtworkPage.css';
// import SearchArt from './SearchArt';
// import Loading from './Loading';

// const ArtworkCard = ({ artwork }) => (
//   <div key={artwork.id} className="col-md-3 col-sm-4 mb-4 artwork-card-wrapper">
//     <Link to={`/artworks/${artwork.id}`} className="text-decoration-none">
//       <div className="artwork-card">
//         <div className="artwork-card-image">
//           <img src={artwork.image} alt={artwork.title} className="artwork-img" />
//           <div className="artwork-overlay">
//             <div className="overlay-content">
//               <h5 className="overlay-title">{artwork.title}</h5>
//               <p className="overlay-price">{artwork.price}</p>
//               <div className="btn btn-custom">View More</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   </div>
// );

// const ArtworkPage = () => {
//   const [artworks, setArtworks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchArt, setSearchArt] = useState('');

//   const fetchArtworks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://the-met-gallery-backend.onrender.com/artworks');

//       if (!response.ok) {
//         throw new Error('Failed to fetch artworks');
//       }

//       const data = await response.json();
//       setArtworks(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArtworks();
//   }, []);

//   if (loading) {
//     return <Loading />
//   }

//   if (error) {
//     return <div className="text-center text-danger">Error: {error}</div>;
//   }

//   const filteredArts = artworks.filter((artwork) =>
//     artwork?.title?.toLowerCase().includes(searchArt.toLowerCase())
//   );

//   return (
//     <div className="container-fluid gallery-background">
//       <div className="container my-4">
//         <h1 className="text-center mb-4 text-light">Artwork Gallery</h1>
//         <SearchArt setSearchArt={setSearchArt} searchArt={searchArt} />
//         <div className="row">
//           {filteredArts.map(artwork => (
//             <ArtworkCard key={artwork.id} artwork={artwork} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import EventsNavbar from './EventsNavbar';
import SearchEvent from './SearchEvent';

const EventsPage = () => {
  const [searchEvent, setSearchEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://the-met-gallery-backend.onrender.com/artworks');

      if (!response.ok) {
        console.log('Response status:', response.status);
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);

    } catch (error) {
      setError(error.message);
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title && event.title.toLowerCase().includes(searchEvent.toLowerCase())
  );

  return (
    <div className="events-page">
      <div>
        <EventsNavbar />
      </div>
      <div>
        <SearchEvent searchEvent={searchEvent} setSearchEvent={setSearchEvent}/>
      </div>
      <div className="events-list">
        {loading && <p>Loading events...</p>}
        {error && <p>{error}</p>}
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image_url} alt={event.title} className="event-image" />
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.details}</p>
                <div className="event-actions">
                  <Link to={`/events/${event.id}`} className="details-link">View Details</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;


