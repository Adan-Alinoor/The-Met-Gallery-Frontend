import React from "react";
import "./HomePage.css";

const images = {
  artImages: [
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMiZxCrm-ESjn-qei3jYFtox2v0kyFQcHHAA&s", alt: "Art 1" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_18gsawsOxSokFiC6Ob2tNfYCPNRlJzupg&s", alt: "Art 2" },
    { src: "https://i.pinimg.com/236x/72/76/d5/7276d53b2d673aa383281825b29cc11d.jpg", alt: "Art 3" },
    { src: "https://i.pinimg.com/236x/c5/fc/97/c5fc970ba7f88430b885f658df2e1404.jpg", alt: "Art 4" },
    { src: "https://i.pinimg.com/236x/79/5c/a4/795ca44b5ff3b71f63514f10baa6d9f7.jpg", alt: "Art 5" },
    { src: "https://i.pinimg.com/474x/1c/57/0d/1c570df6805c6c37c0bcaea3de9eefda.jpg", alt: "Art 6" },
    { src: "https://i.pinimg.com/236x/4f/f2/05/4ff20570381155807588dfa86e2a8a42.jpg", alt: "Art 7" },
    { src: "https://i.pinimg.com/236x/fe/8f/65/fe8f65fbbfdcee5f2e115c859ed24391.jpg", alt: "Art 8" }
  ],
  otherImages: {
    paintbrush: "https://i.pinimg.com/236x/97/f8/14/97f8149d33dbeb544477aef0ac14791a.jpg",
    palette: "https://i.pinimg.com/474x/1e/e3/06/1ee3065f0ab80af7f472281db7c33588.jpg",
    easel: "https://i.pinimg.com/236x/63/e5/80/63e580c6df7430d72d57c2dba1828ec3.jpg",
    canvas: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrQcwmaZQPriZXlJrmVm6E0zATGGEPWZi1rw&s",
    paintSet: "https://i.pinimg.com/236x/08/2a/2b/082a2bc4deb7d20d0fe08081593fa5e9.jpg"
  }
};

const HomePage = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Discover Why Art Lovers Choose Us</h1>

      <div className="top-row">
        {images.artImages.slice(0, 6).map((image, index) => (
          <div key={index} className="image-card">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      <div className="bottom-row">
        <div className="left-column">
          <p className="description">
            <span className="highlight">Art is not just a visual experience, but a soulful journey.</span><br />
            Each stroke of the brush tells a story, a narrative woven with passion and creativity.<br />
            <span className="highlight">Immerse yourself in the realm where imagination meets reality,</span><br />
            and every creation becomes a timeless treasure.<br />
            <span className="highlight">Let the colors speak to you,</span><br />
            and discover the beauty that lies in each moment captured.<br />
            <span className="highlight">Join our celebration of artistic excellence,</span><br />
            where the ordinary becomes extraordinary and each artwork is a gateway to wonder.
          </p>
          <img src={images.otherImages.paintbrush} alt="Paintbrush" className="small-image"/>
          <img src={images.otherImages.palette} alt="Palette" className="small-image"/>
          <img src={images.otherImages.easel} alt="Easel" className="small-image"/>
          <img src={images.otherImages.canvas} alt="Canvas" className="small-image"/>
          <img src={images.otherImages.paintSet} alt="Paint Set" className="small-image"/>
        </div>

        <div className="right-column">
          <p className="description">
            Get to Discover Timeless Masterpieces and Emerging Talent
          </p>
          <div className="image-wrapper">
            {images.artImages.slice(6).map((image, index) => (
              <img key={index} src={image.src} alt={image.alt} className="art-image"/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
