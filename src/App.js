import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from './pages/Cart';
import About from "./pages/About";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* Toaster must be OUTSIDE <Routes> */}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

         {/* NEW PAGES */}
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
