import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Priya Sharma",
    image: "https://i.pravatar.cc/150?img=5",
    rating: "★★★★★",
    review:
      "DecorNest completely transformed my living room. The quality is outstanding and delivery was quick!",
  },
  {
    name: "Rahul Verma",
    image: "https://i.pravatar.cc/150?img=12",
    rating: "★★★★★",
    review:
      "The décor items look exactly like the pictures. Premium quality and excellent customer service.",
  },
  {
    name: "Ananya Patel",
    image: "https://i.pravatar.cc/150?img=32",
    rating: "★★★★★",
    review:
      "Beautiful collections and affordable prices. My bedroom looks amazing after shopping from DecorNest.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonial-heading">
        <h2>What Our Customers Say</h2>
        <p>
          Thousands of happy customers have transformed their homes with
          DecorNest.
        </p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <span>{item.rating}</span>

            <p>"{item.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;