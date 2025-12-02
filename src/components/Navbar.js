import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { products } from "../data/products";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase()) ||
      p.category.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered.slice(0, 8)); // limit results 
    setShowDropdown(true);
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    setQuery("");
    setShowDropdown(false);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      goToProduct(results[0].id);
    }
  };

  return (
    <header className="nav-container">
      <div className="nav-left" onClick={() => navigate("/")}>
        <img src="/xylus-logo.png" alt="Xylus Essentials" className="nav-logo" />
      </div>

      {/* SEARCH BAR */}
      <div className="nav-center">
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleSearch}
            onKeyDown={handleEnterKey}
            onFocus={() => query && setShowDropdown(true)}
          />
          <FaSearch className="search-icon" />

          {/* SEARCH DROPDOWN */}
          {showDropdown && results.length > 0 && (
            <div className="search-dropdown">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="search-item"
                  onClick={() => goToProduct(item.id)}
                >
                  <img src={item.image} alt="" className="search-thumb" />
                  <div>
                    <p className="search-name">{item.name}</p>
                    <span className="search-category">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showDropdown && results.length === 0 && (
            <div className="search-dropdown search-no-results">
              No products found
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-right">
        <div className="nav-icon-wrapper" onClick={() => navigate("/wishlist")}>
          <FaHeart className="nav-icon" />
          <span className="icon-label">Wishlist</span>
        </div>

        <div className="nav-icon-wrapper" onClick={() => navigate("/cart")}>
          <FaShoppingCart className="nav-icon" />
          <span className="icon-label">Cart</span>
        </div>

        <div className="nav-icon-wrapper user-icon-box">
          <SignedOut>
            <SignInButton mode="modal">
              <FaUser className="nav-icon" />
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <span className="icon-label">Account</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
