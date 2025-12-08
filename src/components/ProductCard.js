import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const [wishlisted, setWishlisted] = useState(false);
  const [inCart, setInCart] = useState(false);

  // Load initial state from storage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setWishlisted(wishlist.some((p) => p.id === product.id));
    setInCart(cart.some((p) => p.id === product.id));
  }, [product.id]);

  // --- WISHLIST TOGGLE ---
  const toggleWishlist = (e) => {
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlisted) {
      // REMOVE
      wishlist = wishlist.filter((p) => p.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlisted(false);
      toast.error("Removed from Wishlist 💔");
    } else {
      // ADD
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlisted(true);
      toast.success("Added to Wishlist ❤️");
    }
  };

  // --- CART TOGGLE ---
  const toggleCart = (e) => {
    e.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (inCart) {
      // REMOVE
      cart = cart.filter((p) => p.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      setInCart(false);
      toast.error("Removed from Cart ❌");
    } else {
      // ADD
      cart.push({ ...product, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setInCart(true);
      toast.success("Added to Cart 🛒");
    }
  };

  return (
    <div
      className="pro-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="pro-card-img-box">
        <img src={product.image} alt={product.name} />

        <div className="pro-card-icons">
          <button
            className={`icon-btn ${wishlisted ? "active-heart" : ""}`}
            onClick={toggleWishlist}
          >
            <FaHeart />
          </button>

          <button
            className={`icon-btn ${inCart ? "active-cart" : ""}`}
            onClick={toggleCart}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      <div className="pro-card-info">
        <p className="pro-category">{product.category}</p>
        <h3 className="pro-title">{product.name}</h3>
        <p className="price">₦{product.price.toLocaleString()} {product.unit}</p>

      </div>
    </div>
  );
};

export default ProductCard;
