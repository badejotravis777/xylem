import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null; // SAFE GUARD
  const img = product.image || "/fallback.png"; // FALLBACK IMAGE

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-img-wrapper">
        <img src={img} alt={product.name || "Product"} className="product-img" />

        {/* ACTION ICONS */}
        <div className="product-actions">
          <FaHeart className="action-icon" />
          <FaShoppingCart className="action-icon" />
        </div>
      </div>

      <p className="product-category">{product.category}</p>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₦{product.price?.toLocaleString()}</p>
    </div>
  );
};

export default ProductCard;
