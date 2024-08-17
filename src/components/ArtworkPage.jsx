// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ArtworkPage.css';
// import SearchArt from './SearchArt';

// const ArtworkCard = ({ artwork }) => (
//   <div key={artwork.id} className="col-md-3 col-sm-4 mb-4 artwork-card-wrapper">
//     <div className="artwork-card">
//       <Link to={`/artworks/${artwork.id}`} className="text-decoration-none">
//         <div className="artwork-card-image">
//           <img src={artwork.image} alt={artwork.title} className="artwork-img" />
//           <div className="artwork-overlay">
//             <div className="overlay-content">
//               <h5 className="overlay-title">{artwork.title}</h5>
//               <p className="overlay-price">{artwork.price}</p>
//               <Link to={`/artworks/${artwork.id}`} className="btn btn-custom">View More</Link>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   </div>
// );

// const ArtworkPage = () => {
//   const [artworks, setArtworks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [searchArt,setSearchArt] = useState('')

//   const fetchArtworks = async () => {
//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session?.accessToken;

//     if (!token) {
//       navigate('/');
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:5555/artworks', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'METHOD': 'GET',
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           navigate('/');
//         } else {
//           throw new Error('Failed to fetch artworks');
//         }
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
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">Error: {error}</div>;
//   }


//   const filteredArts =artworks.filter((artwork) => artwork.name.toLowerCase().includes(searchArt.toLowerCase()))
//   return (
//     <div className="container-fluid gallery-background">
//       <div className="container my-4">
//         <h1 className="text-center mb-4 text-light">Artwork Gallery</h1>
//         <div className="row">
//           <SearchArt setSearchArt={setSearchArt} searchArt={searchArt}/>
//           {artworks.map(artwork => (
//             <ArtworkCard key={artwork.id} artwork={filteredArts} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkPage;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ArtworkPage.css';
// import SearchArt from './SearchArt';

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
//   const navigate = useNavigate();
//   const [searchArt, setSearchArt] = useState('');

//   const fetchArtworks = async () => {
//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session?.accessToken;

//     if (!token) {
//       navigate('/');
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:5555/artworks', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'METHOD': 'GET',
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           navigate('/');
//         } else {
//           throw new Error('Failed to fetch artworks');
//         }
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
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">Error: {error}</div>;
//   }

//   const filteredArts = artworks.filter((artwork) => 
//     artwork?.name?.toLowerCase().includes(searchArt.toLowerCase())
//   );

//   return (
//     <div className="container-fluid gallery-background">
//       <div className="container my-4">
//         <h1 className="text-center mb-4 text-light">Artwork Gallery</h1>
//         <div className="row">
//           <SearchArt setSearchArt={setSearchArt} searchArt={searchArt} />
//           {artworks.map(artwork => (
//             <ArtworkCard key={artwork.id} artwork={artwork} artworks={filteredArts} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkPage;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArtworkPage.css';
import SearchArt from './SearchArt';

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
  const navigate = useNavigate();

  const fetchArtworks = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    if (!token) {
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
        if (response.status === 401) {
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
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
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
