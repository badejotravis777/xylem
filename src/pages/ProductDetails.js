import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { products } from "../data/products";
import PaymentModal from "../components/PaymentModal";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));
  const [open, setOpen] = useState(false);

  if (!product) return <div>Product not found</div>;

  // --------------------------
  // ADD TO CART FUNCTION
  // --------------------------
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p.id === product.id);

    if (exists) {
      toast.error("Item already in cart");
      return;
    }

    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added to cart");
  };

  // --------------------------------
  // RELATED PRODUCTS (same category)
  // --------------------------------
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // --------------------------------
  // CATEGORY CLICK — RETURN TO HOME
  // --------------------------------
  const handleCategoryClick = () => {
    navigate("/", { state: { category: product.category } });
  };

  return (
    <>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link> <span>/</span>
        <button onClick={handleCategoryClick} className="pd-breadcrumb-btn">
          {product.category}
        </button>
        <span>/</span>
        <p>{product.name}</p>
      </div>

      <div className="pd-container">
        {/* LEFT */}
        <div className="pd-left">
          <div className="pd-image-box">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="pd-right">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-price-box">
            <span className="pd-price">
              ₦{product.price.toLocaleString()}
            </span>
          </div>

          <p className="pd-description">{product.description}</p>

          {/* FEATURES */}
          <div className="pd-features">
            <div className="pd-feature-item">
              <div className="pd-circle" />
              <p>High Quality</p>
            </div>
            <div className="pd-feature-item">
              <div className="pd-circle" />
              <p>Fast Delivery</p>
            </div>
            <div className="pd-feature-item">
              <div className="pd-circle" />
              <p>Trusted Vendor</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="pd-buttons">
            <button className="pd-cart-btn" onClick={addToCart}>
              Add to Cart
            </button>

            <button
              className="pd-buy-btn"
              onClick={() => setOpen(true)}
            >
              Buy Now
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="pd-trust">
            <div><span className="pd-badge-icon" /> Secure Payment</div>
            <div><span className="pd-badge-icon" /> Fast Delivery</div>
            <div><span className="pd-badge-icon" /> 24/7 Support</div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="pd-related-section">
        <h2>Related Products</h2>

        <div className="pd-related-grid">
          {related.map((item) => (
            <Link
              to={`/product/${item.id}`}
              className="pd-related-card"
              key={item.id}
            >
              <img src={item.image} alt={item.name} />
              <p className="pd-related-name">{item.name}</p>
              <p className="pd-related-price">
                ₦{item.price.toLocaleString()} {product.unit}
                
              </p>
            </Link>
          ))}
        </div>
      </div>

      <PaymentModal open={open} onClose={() => setOpen(false)} product={product} />

      <Footer />
    </>
  );
};

export default ProductDetails;
