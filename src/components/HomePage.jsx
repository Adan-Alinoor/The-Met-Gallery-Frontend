import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">The Met Gallery</div>
        <ul className="nav-links">
          <li><a href="#artwork">Artwork</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#about">About Us</a></li>
          
        </ul>
      </nav>

      {/* Gallery Section */}
      <div className="gallery-container">
        <h1 className="gallery-title">Discover Why Art Lovers Choose Us</h1>

        <div className="top-row">
          <div className="image-card">
            <img src="path-to-your-image1.jpg" alt="Art 1" />
          </div>
          <div className="image-card">
            <img src="path-to-your-image2.jpg" alt="Art 2" />
          </div>
          <div className="image-card">
            <img src="path-to-your-image3.jpg" alt="Art 3" />
          </div>
        </div>

        <div className="bottom-row">
          <div className="left-column">
            <p className="description">
              Capturing Moments, One Brushstroke at a Time <br />
              Be the First to See Our Latest Creations <br />
              Join Us in Celebrating Art <br />
              Explore a World of Artistic Wonders
            </p>
            <img src="path-to-your-paintbrush-image.jpg" alt="Paintbrush" className="small-image"/>
            <img src="path-to-your-palette-image.jpg" alt="Palette" className="small-image"/>
          </div>

          <div className="right-column">
            <p className="description">
              Get to Discover Timeless Masterpieces and Emerging Talent
            </p>
            <div className="image-wrapper">
              <img src="path-to-your-image4.jpg" alt="Art 4" className="art-image"/>
              <img src="path-to-your-image5.jpg" alt="Art 5" className="art-image"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;