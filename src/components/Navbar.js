import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaInfoCircle,
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
  const [menuOpen, setMenuOpen] = useState(false);


  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered.slice(0, 8));
    setShowDropdown(true);
  };

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
    setQuery("");
    setShowDropdown(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      goToProduct(results[0].id);
    }
  };

  return (
    <>
      <header className="nav-container">
        {/* LOGO */}
        <div className="nav-left" onClick={() => navigate("/")}>
          <img
            src="/xylus-logo.png"
            alt="Xylus Essentials"
            className="nav-logo"
          />
        </div>

        {/* DESKTOP SEARCH */}
        <div className="nav-center desktop-only">
          <div className="nav-search">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleSearch}
              onKeyDown={handleEnter}
              onFocus={() => query && setShowDropdown(true)}
            />
            <FaSearch className="search-icon" />

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

        {/* DESKTOP ICONS */}
        <div className="nav-right desktop-only">
          <div
            className="nav-icon-wrapper"
            onClick={() => navigate("/wishlist")}
          >
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

        {/* MOBILE ICONS */}
        <div className="mobile-icons-wrapper mobile-only">
          
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />

        <div className="mobile-menu-items">
          <p onClick={() => navigate("/wishlist")}>
            <FaHeart className="mobile-menu-icon" /> Wishlist
          </p>

          <p onClick={() => navigate("/cart")}>
            <FaShoppingCart className="mobile-menu-icon" /> Cart
          </p>

          <div className="mobile-auth-section">
  <SignedOut>
    <p className="mobile-auth-btn">
      <FaUser className="mobile-menu-icon" />
      <SignInButton mode="modal">Sign In</SignInButton>
    </p>
  </SignedOut>

  <SignedIn>
    <div className="mobile-user-btn">
      <FaUser className="mobile-menu-icon" />
      <UserButton afterSignOutUrl="/" />
    </div>
  </SignedIn>
</div>


          <p onClick={() => navigate("/about")}>
            <FaInfoCircle className="mobile-menu-icon" /> About Us
          </p>

          
        </div>
      </div>
    </>
  );
};

export default Navbar;
