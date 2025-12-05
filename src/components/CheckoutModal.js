import React from "react";

const CheckoutModal = ({ open, onClose, amount }) => {
  if (!open) return null;

  // Placeholder bank info (you can update these later)
  const bank = {
    name: "Bank Name (To be updated)",
    accountName: "Account Name (To be updated)",
    accountNumber: "0000000000"
  };

  // Updated WhatsApp number
  const waMessage = encodeURIComponent(
    `Hello, I have made payment for my order totaling ₦${amount.toLocaleString()}. Please confirm.`
  );

  const waUrl = `https://wa.me/2348137223401?text=${waMessage}`;

  return (
    <div className="modal-overlay" role="dialog">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>

        <h2>Checkout – Bank Transfer</h2>

        <div className="bank-details">
          <div><strong>Bank Name:</strong> {bank.name}</div>
          <div><strong>Account Name:</strong> {bank.accountName}</div>
          <div><strong>Account Number:</strong> {bank.accountNumber}</div>
        </div>

        <p className="after-pay">
          After payment, click below to confirm your order.
        </p>

        <a className="whatsapp-confirm" href={waUrl} target="_blank" rel="noopener noreferrer">
          Confirm on WhatsApp
        </a>

        <button className="btn-muted" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
