import React, { useState, useEffect } from "react";
import api, { API_URL } from "../api";
//import { positions } from "../data/data";
const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get("/allPositions");
        setAllPositions(res.data);
        console.log(res.data);
      } catch (err) {
        const errorMsg =
          err.userMessage || err.message || "Failed to fetch positions";
        console.error("Positions Error:", errorMsg);
        setError(errorMsg);
        setAllPositions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPositions();
  }, []);
  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {error && (
        <div
          style={{
            backgroundColor: "#ffe6e6",
            border: "1px solid #ff4444",
            color: "#d32f2f",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "14px",
          }}
        >
          <strong>⚠️ Error:</strong> {error}
          <br />
          <small style={{ marginTop: "5px", display: "block" }}>
            Make sure your backend server is running on {API_URL}
          </small>
        </div>
      )}

      {isLoading && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#666",
          }}
        >
          Loading positions...
        </div>
      )}

      {!isLoading && allPositions.length === 0 && !error && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#666",
          }}
        >
          No positions found
        </div>
      )}

      {!isLoading && allPositions.length > 0 && (
        <div className="order-table">
          <table>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>

            {allPositions.map((stock, index) => {
              const curValue = stock.quantity * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? " loss" : "profit";
              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;
