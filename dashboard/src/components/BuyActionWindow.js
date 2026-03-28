import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import api from "../api";

const BuyActionWindow = ({ uid, actionType = "buy" }) => {
  const context = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState(null);

  const isBuyMode = actionType === "buy";
  const buttonText = isBuyMode ? "Buy" : "Sell";
  const mode = isBuyMode ? "BUY" : "SELL";

  const handleActionClick = async () => {
    if (!stockQuantity || !stockPrice) {
      setError("Please fill in both quantity and price");
      return;
    }
    try {
      setError(null);
      await api.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: mode,
      });
      context.closeBuyWindow();
      alert(`${mode} order placed successfully!`);
    } catch (error) {
      const errorMsg =
        error.userMessage ||
        error.message ||
        "Network error - Backend server may not be running";
      console.error(`Error placing ${mode} order:`, errorMsg);
      setError(errorMsg);
    }
  };
  const handleCancelClick = () => {
    context.closeBuyWindow();
  };
  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleActionClick}>
            {buttonText}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
      {error && (
        <div
          style={{
            backgroundColor: "#ffe6e6",
            border: "1px solid #ff4444",
            color: "#d32f2f",
            padding: "10px",
            borderRadius: "4px",
            marginTop: "10px",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default BuyActionWindow;
