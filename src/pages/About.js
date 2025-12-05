import React from "react";
import "./About.css";
import Navbar from "../components/Navbar";
import AnnouncementBar from "../components/AnnouncementBar";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";
import Footer from "../components/Footer";

const About = () => {
  const featured = products.slice(0, 4);

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      {/* HERO */}
      <div className="about-hero">
        <h1>About Xylus Essentials</h1>
        <p>Premium fragrances crafted for elegance and everyday luxury.</p>
      </div>

      {/* WHO WE ARE */}
      <section className="split-section">
        <div className="text-block">
          <h2>Who We Are</h2>
          <p>
            Xylus Essentials is a modern beauty and lifestyle brand delivering 
            premium fragrances, scented candles, oils, and personal care essentials.
          </p>
          <p>
            We combine authenticity, craftsmanship, and affordability to elevate your
            everyday life with unforgettable scents and luxury experiences.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="split-section alt">
        <div className="text-block">
          <h2>Our Mission</h2>
          <p>
            To inspire confidence and self-expression through luxurious fragrances 
            and beauty products that elevate your environment and personal style.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">Quality You Can Trust</div>
          <div className="value-card">Authenticity Guaranteed</div>
          <div className="value-card">Customer-First Experience</div>
          <div className="value-card">Affordable Luxury</div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <ProductGrid items={featured} />
      </section>

      <Footer />
    </>
  );
};

export default About;
