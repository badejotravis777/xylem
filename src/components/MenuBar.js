import React from "react";
import "./MenuBar.css";
import { Link } from "react-router-dom";

const MenuBar = ({ onToggleSidebar }) => {
  return (
    <div className="menu-bar">
      <button className="menu-toggle" onClick={onToggleSidebar}>
        ☰
      </button>

      <nav className="menu-links">
      <Link to="/" state={{ category: null }}>
  Home
</Link>

    
        <a href="/about">About</a>
       
      </nav>
    </div>
  );
};

export default MenuBar;
