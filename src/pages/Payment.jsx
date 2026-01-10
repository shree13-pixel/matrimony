import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();
  const { plan = "Gold - 3 Months", price = 4955 } = state || {};

  const [paymentMode, setPaymentMode] = useState("UPI");

  return (
    <div style={styles.page}>
      {/* ================= LEFT : PAYMENT MODES ================= */}
      <div style={styles.left}>
        <h3>Payment Mode</h3>

        {["UPI", "CARD", "EMI", "NETBANKING"].map((mode) => (
          <div
            key={mode}
            style={{
              ...styles.modeItem,
              backgroundColor:
                paymentMode === mode ? "#f1f7ff" : "#fff",
              borderLeft:
                paymentMode === mode ? "4px solid #ff6600" : "4px solid transparent"
            }}
            onClick={() => setPaymentMode(mode)}
          >
            {mode === "UPI" && "Pay via UPI"}
            {mode === "CARD" && "Credit / Debit Card"}
            {mode === "EMI" && "EMI Options"}
            {mode === "NETBANKING" && "Net Banking"}
          </div>
        ))}
      </div>

      {/* ================= CENTER : PAYMENT CONTENT ================= */}
      <div style={styles.center}>
        {paymentMode === "UPI" && (
          <>
            <h3>Scan and Pay</h3>

            <div style={styles.qrBox}>QR CODE</div>

            <p style={{ margin: "10px 0", color: "#666" }}>
              Scan QR using your UPI app
            </p>

            <p>OR</p>

            <input
              type="text"
              placeholder="Enter UPI ID"
              style={styles.input}
            />

            <button style={styles.payBtn}>Pay ₹{price}</button>
          </>
        )}

        {paymentMode === "CARD" && (
          <>
            <h3>Credit / Debit Card</h3>

            <input placeholder="Card Number" style={styles.input} />
            <input placeholder="Name on Card" style={styles.input} />

            <div style={{ display: "flex", gap: "10px" }}>
              <input placeholder="MM/YY" style={styles.input} />
              <input placeholder="CVV" style={styles.input} />
            </div>

            <button style={styles.payBtn}>Pay ₹{price}</button>
          </>
        )}

        {paymentMode === "EMI" && (
          <>
            <h3>EMI Options</h3>
            <label><input type="radio" /> 3 Months EMI</label><br />
            <label><input type="radio" /> 6 Months EMI</label><br />
            <label><input type="radio" /> 12 Months EMI</label><br />

            <button style={styles.payBtn}>Continue</button>
          </>
        )}

        {paymentMode === "NETBANKING" && (
          <>
            <h3>Net Banking</h3>
            <select style={styles.input}>
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis Bank</option>
            </select>

            <button style={styles.payBtn}>Pay ₹{price}</button>
          </>
        )}
      </div>

      {/* ================= RIGHT : ORDER SUMMARY ================= */}
      <div style={styles.right}>
        <h3>Order Summary</h3>

        <div style={styles.summaryRow}>
          <span>{plan}</span>
          <span>₹5,500</span>
        </div>

        <div style={styles.summaryRow}>
          <span>Discount</span>
          <span style={{ color: "green" }}>-₹1,500</span>
        </div>

        <div style={styles.summaryRow}>
          <span>GST (18%)</span>
          <span>₹756</span>
        </div>

        <hr />

        <div style={{ ...styles.summaryRow, fontWeight: "bold" }}>
          <span>You have to pay</span>
          <span>₹{price}</span>
        </div>
      </div>
    </div>
  );
}
const styles = {
  page: {
    display: "flex",
    gap: "20px",
    maxWidth: "1200px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  left: {
    width: "220px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px"
  },
  modeItem: {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #eee"
  },
  center: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px"
  },
  right: {
    width: "260px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fafafa"
  },
  qrBox: {
    width: "180px",
    height: "180px",
    background: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px auto"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0"
  },
  payBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff6600",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0"
  }
};
