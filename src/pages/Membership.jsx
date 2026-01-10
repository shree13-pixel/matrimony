import React from 'react';
import "../styles/pageBackground.css";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();

  return (
    <div className="page-with-background">
      <div className="page-content">
        <div className="page-container fade-in">
      <h1>Membership Plans</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="card">
          <h3>Basic Plan</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black', margin: '1rem 0' }}>
            ₹499/month
          </div>
          <ul>
            <li>View up to 50 profiles</li>
            <li>Send 10 interests</li>
            <li>Basic profile verification</li>
            <li>Email support</li>
          </ul>
          <button
  onClick={() =>
    navigate("/payment", {
      state: { plan: "Basic", price: 499 }
    })
  }
  style={{
    width: "100%",
    marginTop: "1rem",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  }}
>
  Choose Basic
</button>

        </div>

        <div className="card">
          <h3>Premium Plan</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black', margin: '1rem 0' }}>
            ₹999/month
          </div>
          <ul>
            <li>Unlimited profile views</li>
            <li>Send unlimited interests</li>
            <li>Advanced profile verification</li>
            <li>Priority matching</li>
            <li>Phone & chat support</li>
          </ul>
          <button
  onClick={() =>
    navigate("/payment", {
      state: { plan: "premium", price: 999 }
    })
  }
  style={{
    width: "100%",
    marginTop: "1rem",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  }}
>
  Choose premium
</button>

        </div>

        <div className="card">
          <h3>VIP Plan</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black', margin: '1rem 0' }}>
            ₹1999/month
          </div>
          <ul>
            <li>All Premium features</li>
            <li>Personal matchmaker</li>
            <li>Profile enhancement</li>
            <li>Exclusive events access</li>
            <li>24/7 dedicated support</li>
          </ul>
           <button
  onClick={() =>
    navigate("/payment", {
      state: { plan: "VIP", price: 1999 }
    })
  }
  style={{
    width: "100%",
    marginTop: "1rem",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer"
  }}
>
  Choose VIP
</button>

        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Membership;