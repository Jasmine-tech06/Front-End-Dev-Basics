import React from "react";
import "./BestSellers.css";

const products = [
  {
    image: "https://images.unsplash.com/photo-1580130281320-0ef0754f2bf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwdGFibGUlMjBsYW1wc3xlbnwwfHwwfHx8MA%3D%3D",
    name: "Modern Table Lamp",
    price: "₹1,499",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    image: "https://images.unsplash.com/photo-1763909130791-c602c022b38e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGx1eHVyeSUyMHdhbGwlMjBjbG9jayUyMGZvciUyMGhvbWUlMjBkZWNvciUyMDRrJTIwaGR8ZW58MHx8MHx8fDA%3D",
    name: "Luxury Wall Clock",
    price: "₹2,199",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    image: "https://images.unsplash.com/photo-1633169744241-a4323857e7dc?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZG9vciUyMHBsYW50JTIwcG90JTIwZm9yJTIwaG9tZSUyMGRlY29yfGVufDB8fDB8fHww",
    name: "Indoor Plant Pot",
    price: "₹999",
    rating: "⭐⭐⭐⭐☆",
  },
  {
    image: "https://media.istockphoto.com/id/1373297223/photo/a-modern-spring-bouquet-with-freesias-ranunculus-and-tulips-in-a-beautiful-vase.webp?a=1&b=1&s=612x612&w=0&k=20&c=vFTcdLy1QNM9LqBHU2BjAk_L4R-9gcqq7PkF9F45BQs=",
    name: "Minimal Flower Vase",
    price: "₹1,299",
    rating: "⭐⭐⭐⭐⭐",
  },
];

const BestSellers = () => {
  return (
    <section className="best">
      <div className="best-heading">
        <h2>Best Sellers</h2>
        <p>
          Our customers' favorite décor pieces that transform every home.
        </p>
      </div>

      <div className="best-grid">
        {products.map((item, index) => (
          <div className="best-card" key={index}>
            <img src={item.image} alt={item.name} />

            <div className="best-content">
              <h3>{item.name}</h3>

              <p className="rating">{item.rating}</p>

              <h4>{item.price}</h4>

              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;