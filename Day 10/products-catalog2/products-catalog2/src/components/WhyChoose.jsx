import React from "react";
import "./WhyChoose.css";

const features = [
  {
    icon: "🏡",
    title: "Premium Home Décor",
    desc: "Carefully curated products that elevate every corner of your home.",
  },
  {
    icon: "✨",
    title: "Elegant Designs",
    desc: "Modern, aesthetic and timeless designs that suit every style.",
  },
  {
    icon: "🚚",
    title: "Fast & Safe Delivery",
    desc: "We ensure your decor items reach you safely and on time.",
  },
  {
    icon: "💖",
    title: "Trusted by Customers",
    desc: "Thousands of happy homes decorated with DecorNest products.",
  },
];

const WhyChoose = () => {
  return (
    <section className="whychoose-section" id="why-us">
      <h2 className="whychoose-title">Why Choose DecorNest?</h2>
      <p className="whychoose-subtitle">
        We don’t just sell décor — we help you build beautiful living spaces.
      </p>

      <div className="whychoose-grid">
        {features.map((item, index) => (
          <div className="whychoose-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;