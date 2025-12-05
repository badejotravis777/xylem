import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CheckoutModal from "../components/CheckoutModal";
import Footer from "../components/Footer";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <Navbar />

      <div className="cart-container">
        {/* HEADER */}
        <div className="cart-header-bar">
          <h2 className="cart-heading">Shopping Cart</h2>
          <p className="cart-sub">
            Review the items in your cart and proceed to secure checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is currently empty.</p>
        ) : (
          <div className="cart-wrapper">
            {/* LEFT - CART ITEMS */}
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} />

                  <div className="item-info">
                    <p className="item-category">{item.category}</p>
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">
                      ₦{item.price.toLocaleString()}
                    </p>

                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - TOTAL BOX */}
            <div className="cart-summary-box">
              <h3>Order Summary</h3>

              <div className="summary-line">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <div className="summary-divider"></div>

              <button className="checkout-btn" onClick={() => setOpen(true)}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal open={open} onClose={() => setOpen(false)} amount={total} />


      <Footer />
    </>
    
  );
};

export default Cart;
