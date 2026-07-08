import React from "react";
import "./Gallery.css";

const images = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800",
  "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
];

const Gallery = () => {
  return (
    <section className="gallery">
      <div className="gallery-heading">
        <h2>Home Inspiration Gallery</h2>
        <p>
          Get inspired with elegant décor ideas curated by DecorNest.
        </p>
      </div>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="gallery-item" key={index}>
            <img src={img} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;