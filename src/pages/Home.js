import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AnnouncementBar from "../components/AnnouncementBar";
import MenuBar from "../components/MenuBar";
import CategorySidebar from "../components/CategorySidebar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const initialCategory = location.state?.category || null;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // SORTING STATE
  const [sortOption, setSortOption] = useState("top");

  // Reset to default view when Home is opened without category state
  useEffect(() => {
    if (!location.state?.category) {
      setSelectedCategory(null);
    }
  }, [location]);

  // FILTERING
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  // SORT FUNCTION
  const sortProducts = (list, option) => {
    let sorted = [...list];

    switch (option) {
      case "low":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "high":
        sorted.sort((a, b) => b.price - a.price);
        break;

      default:
        // “Top Selling” → keep default order
        break;
    }

    return sorted;
  };

  const finalProducts = sortProducts(filteredProducts, sortOption);

  return (
    <>
      {/* TOP INFO BAR */}
      <AnnouncementBar />

      {/* FULL NAVBAR */}
      <Navbar />

      {/* SECONDARY MENU BAR */}
      <MenuBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="main-container">
        {/* SIDEBAR */}
        {sidebarOpen && (
          <CategorySidebar
            selected={selectedCategory}
            onSelect={(c) => setSelectedCategory(c)}
          />
        )}

        {/* MAIN AREA */}
        <div className="content-area">
          <div className="content-header">
            <h2 className="page-title">All Products</h2>

            {/* SORT DROPDOWN */}
            <div className="sort-box">
              <span>Sort By:</span>
              <select
                className="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="top">Top selling</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <ProductGrid items={finalProducts} />
        </div>
      </div>

      {/* WHATSAPP BUTTON */}
      <a
        className="wa-float"
        href="https://wa.me/2348137223401?text=Hello%20Xylus%20Essentials"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬
      </a>
      <Footer />

    </>
  );
};

export default Home;
