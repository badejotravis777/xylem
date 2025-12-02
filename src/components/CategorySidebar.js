import React from "react";

const categories = [
  "Hyaluronic acids",
  "Actives",
  "Powders/Enzymes",
  "Liquids/Oils",
];

const CategorySidebar = ({ selected, onSelect }) => {
  return (
    <aside className="sidebar">
      <h3>Product Categories</h3>
      <ul className="cat-list">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`cat-item ${selected === cat ? "active" : ""}`}
            onClick={() => onSelect && onSelect(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
