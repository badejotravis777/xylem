import React from "react";

const CheckoutModal = ({ open, onClose, amount }) => {
  if (!open) return null;

  const bank = {
    name: "First Bank",
    accountName: "Xylus Essentials",
    accountNumber: "1234567890"
  };

  const waMessage = encodeURIComponent(
    `Hello, I have made payment for my order totaling ₦${amount.toLocaleString()}. Please confirm.`
  );

  const waUrl = `https://wa.me/234XXXXXXXXXX?text=${waMessage}`;

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

        <a className="whatsapp-confirm" href={waUrl} target="_blank">
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
