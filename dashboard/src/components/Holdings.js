import React, { useState, useEffect } from "react";
import api, { API_URL } from "../api";
import { VerticalGraph } from "./VerticalGraph";
//import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get("/allHoldings");
        setAllHoldings(res.data);
      } catch (err) {
        const errorMsg =
          err.userMessage || err.message || "Failed to fetch holdings";
        console.error("Holdings Error:", errorMsg);
        setError(errorMsg);
        setAllHoldings([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHoldings();
  }, []);
  const labels = allHoldings.map((subArray) => subArray["name"]);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

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
          Loading holdings...
        </div>
      )}

      {!isLoading && allHoldings.length === 0 && !error && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#666",
          }}
        >
          No holdings found
        </div>
      )}

      {!isLoading && allHoldings.length > 0 && (
        <>
          <div className="order-table">
            <table>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
              {allHoldings.map((stock, index) => {
                const curValue = stock.quantity * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? " loss" : "profit";
                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={profClass}>{stock.net}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="row">
            <div className="col">
              <h5>
                29,875.<span>55</span>{" "}
              </h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>
                31,428.<span>95</span>{" "}
              </h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5>1,553.40 (+5.20%)</h5>
              <p>P&L</p>
            </div>
          </div>
          <VerticalGraph data={data} />
        </>
      )}
    </>
  );
};

export default Holdings;
