import React from 'react';
import { Link } from 'react-router-dom';
import './ArtworkPage.css'; // Import component-specific CSS

const artworks = [
  {
    id: 1,
    title: 'Starry Night',
    price: 'Ksh 15,000',
    artist: 'Vincent van Gogh',
    image: 'https://www.researchgate.net/publication/236767323/figure/fig1/AS:299512636690434@1448420785738/Vincent-van-Gogh-The-Starry-Night-1889.png'
  },
  {
    id: 2,
    title: 'Mona Lisa',
    price: 'Ksh 20,000',
    artist: 'Leonardo da Vinci',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3S07h-WnsTnD7eCppKFBSWVqmTeKuliXa0g&s'
  },
  {
    id: 3,
    title: 'The Persistence of Memory',
    price: 'Ksh 18,000',
    artist: 'Salvador Dalí',
    image: 'https://blenderartists.org/uploads/default/original/4X/0/2/6/026f0a590c5b5e1c64fa4b17157491a728eff836.jpeg'
  },
  {
    id: 4,
    title: 'The Scream',
    price: 'Ksh 22,000',
    artist: 'Edvard Munch',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVeSU7rKy6x_oagbLH59Shyx1LKXHXWqfQfw&s'
  },
  {
    id: 5,
    title: 'Girl with a Pearl Earring',
    price: 'Ksh 25,000',
    artist: 'Johannes Vermeer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69BsgernFy4pI-3D_zF_dyYmD1rEMcJuJ-A&s'
  },
  {
    id: 6,
    title: 'The Birth of Venus',
    price: 'Ksh 30,000',
    artist: 'Sandro Botticelli',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkuiECqvyaMNucAz3m-fHjs-4PcCmfDQ86Ow&s'
  },
  {
    id: 7,
    title: 'The Kiss',
    price: 'Ksh 28,000',
    artist: 'Gustav Klimt',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8ASe1zX_8tpZKeFJd5lv7Rm6L0dhBtmiAw&s'
  },
  {
    id: 8,
    title: 'American Gothic',
    price: 'Ksh 17,000',
    artist: 'Grant Wood',
    image: 'https://ichef.bbci.co.uk/images/ic/480xn/p04s63zn.jpg.webp'
  },
  {
    id: 9,
    title: 'Greek Gods',
    price: 'Ksh 10,000',
    artist: 'Nicolo Leonardo',
    image: 'https://learnodo-newtonic.com/wp-content/uploads/2019/03/Zeus-Myths-Featured.jpg'
  }
];

const ArtworkPage = () => {
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
                <p>{artwork.artist}</p>
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
