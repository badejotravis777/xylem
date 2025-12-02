import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load wishlist on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
    setFilteredWishlist(saved);
  }, []);

  // Apply category filtering
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredWishlist(wishlist);
    } else {
      setFilteredWishlist(
        wishlist.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory, wishlist]);

  // Remove single item with animation + toast
  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    toast("Item removed from wishlist", {
      style: { background: "#111", color: "#fff" },
    });
  };

  // Add item to cart (same logic as ProductCard)
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.some((p) => p.id === product.id);

    if (exists) {
      toast("Item already in cart", {
        style: { background: "#111", color: "#fff" },
      });
      return;
    }

    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    toast("Item added to cart", {
      style: { background: "#111", color: "#fff" },
    });
  };

  // Move ALL wishlist items to cart
  const moveAllToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    wishlist.forEach((item) => {
      const exists = cart.some((p) => p.id === item.id);
      if (!exists) cart.push({ ...item, qty: 1 });
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // Empty wishlist
    setWishlist([]);
    localStorage.setItem("wishlist", JSON.stringify([]));

    toast("All items moved to cart", {
      style: { background: "#111", color: "#fff" },
    });
  };

  // Sidebar category list
  const categories = ["All", ...new Set(wishlist.map((p) => p.category))];

  return (
    <>
      <Navbar />

      {/* FLOATING TOP BAR */}
      {wishlist.length > 0 && (
        <div className="wishlist-floating-bar">
          <span>{wishlist.length} saved item(s)</span>

          <button className="move-all-btn" onClick={moveAllToCart}>
            Move All to Cart
          </button>
        </div>
      )}

      <div className="wishlist-wrapper">

        {/* HEADER */}
        <div className="wishlist-hero">
          <h1>Your Wishlist</h1>
          <p>Items you saved for later. Review, compare, or move them to cart anytime.</p>
        </div>

        <div className="wishlist-layout">

          {/* SIDEBAR FILTER */}
          <div className="wishlist-sidebar">
            <h3>Filter by Category</h3>
            <ul>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={selectedCategory === cat ? "active-filter" : ""}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* MAIN CONTENT */}
          <div className="wishlist-content">

            {/* EMPTY UI */}
            {wishlist.length === 0 ? (
              <div className="wishlist-empty">
                <img
                  src="/empty-wishlist.svg"
                  alt="Empty Wishlist"
                  className="wishlist-empty-img"
                />
                <h3>Your wishlist is empty</h3>
                <p>Browse our products and add items you love to your wishlist.</p>
              </div>
            ) : (
              <div className="wishlist-grid">
                {filteredWishlist.map((product) => (
                  <div key={product.id} className="wishlist-card fade-slide">

                    {/* IMAGE */}
                    <div className="wishlist-card-img">
                      <img src={product.image} alt={product.name} />

                      <button
                        className="wishlist-remove-btn"
                        onClick={() => removeItem(product.id)}
                      >
                        ×
                      </button>
                    </div>

                    {/* INFO */}
                    <div className="wishlist-card-body">
                      <p className="wishlist-cat">{product.category}</p>
                      <h3 className="wishlist-name">{product.name}</h3>
                      <p className="wishlist-price">
                        ₦{product.price.toLocaleString()}
                      </p>

                      <button
                        className="wishlist-add-to-cart"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
