import React from "react";
import "./FeaturedCollections.css";

const collections = [
  {
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TGl2aW5nJTIwUm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Living Room",
    description: "Elegant sofas, lamps and décor pieces."
  },
  {
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Bedroom",
    description: "Create a peaceful and luxurious bedroom."
  },
  {
    image: "https://images.unsplash.com/photo-1769501203628-0520479aef53?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGluaW5nJTIwYXJlYSUyMGZvciUyMGhvbWUlMjBkZWNvciUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    title: "Dining",
    description: "Beautiful dining essentials for every home."
  },
  {
    image: "https://images.unsplash.com/photo-1583753075968-1236ccb83c66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kb29yJTIwcGxhbnRzJTIwZm9yJTIwaG9tZSUyMGRlY29yJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    title: "Indoor Plants",
    description: "Fresh greenery for a vibrant lifestyle."
  },
];

const FeaturedCollections = () => {
  return (
    <section className="featured">
      <div className="featured-heading">
        <h2>Featured Collections</h2>
        <p>
          Discover our hand-picked collections designed to transform every
          corner of your home.
        </p>
      </div>

      <div className="featured-grid">
        {collections.map((item, index) => (
          <div className="featured-card" key={index}>
            <img src={item.image} alt={item.title} />

            <div className="featured-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <button>Explore Collection</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;