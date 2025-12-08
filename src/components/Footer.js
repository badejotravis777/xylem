import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* CONTACT INFO */}
        <div className="footer-column">
          <h4 className="footer-title">Contact Info</h4>
          <p className="footer-label">ADDRESS:</p>
          <p className="footer-text">
            NO 1 Gbadebo street ojota Lagos, 
           Lagos, Nigeria
          </p>

          <p className="footer-label">PHONE:</p>
          <p className="footer-text">+2347032084486</p>
        </div>

        {/* STORE LINKS */}
        <div className="footer-column">
          <h4 className="footer-title">Store Links</h4>
          <a className="footer-link" href="/">Home</a>
          <a className="footer-link" href="/login">Login/Register</a>
          <a className="footer-link" href="/wishlist">Wishlist</a>
        </div>

        {/* USEFUL LINKS */}
        <div className="footer-column">
          <h4 className="footer-title">Useful Links</h4>
          <a className="footer-link" href="/contact">Contact Us</a>
        </div>

        {/* OUR STORES */}
        <div className="footer-column">
          <h4 className="footer-title">Our Stores</h4>
          <p className="footer-text">Headquarters</p>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="footer-bottom">
        <p>XYLUS ESSENTIALS © 2025 — POWERED BY TRAVRICK.</p>
      </div>
    </footer>
  );
};

export default Footer;
