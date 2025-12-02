import React from "react";

const PaymentModal = ({ open, onClose, product }) => {
  if (!open) return null;

  const bank = {
    name: "First Bank",
    accountName: "Xylus Essentials",
    accountNumber: "1234567890"
  };

  const waMessage = encodeURIComponent(`Hello Xylus Essentials, I have made payment for ${product.name} (₦${product.price.toLocaleString()}). Please confirm.`)
  const waUrl = `https://wa.me/234XXXXXXXXXX?text=${waMessage}`;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>PAY TO PURCHASE</h2>

        <div className="bank-details">
          <div><strong>Bank Name:</strong> {bank.name}</div>
          <div><strong>Account Name:</strong> {bank.accountName}</div>
          <div><strong>Account Number:</strong> {bank.accountNumber}</div>
        </div>

        <p className="after-pay">After payment, click the button below to confirm.</p>

        <a className="whatsapp-confirm" href={waUrl} target="_blank" rel="noreferrer">
          Confirm Payment on WhatsApp
        </a>

        <div style={{marginTop:12}}>
          <button className="btn-muted" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
