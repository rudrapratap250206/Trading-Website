import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  return (
    <>
      <h3 className="title">Funds</h3>

      <div className="funds-header">
        <div className="funds-info">
          <p className="funds-text">
            Instant, zero-cost fund transfers with UPI
          </p>
        </div>
        <div className="funds-buttons">
          <Link className="btn btn-green">Add funds</Link>
          <Link className="btn btn-blue">Withdraw</Link>
        </div>
      </div>

      <div className="funds-container">
        <div className="funds-column">
          <div className="section-header">
            <h4 className="section-title">Equity</h4>
          </div>

          <div className="funds-card">
            <div className="card-section highlight">
              <div className="data-row">
                <span className="label">Available margin</span>
                <span className="value colored">₹4,043.10</span>
              </div>
              <div className="data-row">
                <span className="label">Used margin</span>
                <span className="value">₹3,757.30</span>
              </div>
              <div className="data-row">
                <span className="label">Available cash</span>
                <span className="value colored">₹4,043.10</span>
              </div>
            </div>

            <div className="divider-line"></div>

            <div className="card-section">
              <div className="data-row">
                <span className="label">Opening Balance</span>
                <span className="value">₹4,043.10</span>
              </div>
              <div className="data-row">
                <span className="label">Opening Balance (Commodity)</span>
                <span className="value">₹3,736.40</span>
              </div>
              <div className="data-row">
                <span className="label">Payin</span>
                <span className="value">₹4,064.00</span>
              </div>
              <div className="data-row">
                <span className="label">SPAN</span>
                <span className="value">₹0.00</span>
              </div>
              <div className="data-row">
                <span className="label">Delivery margin</span>
                <span className="value">₹0.00</span>
              </div>
              <div className="data-row">
                <span className="label">Exposure</span>
                <span className="value">₹0.00</span>
              </div>
              <div className="data-row">
                <span className="label">Options premium</span>
                <span className="value">₹0.00</span>
              </div>
            </div>

            <div className="divider-line"></div>

            <div className="card-section">
              <div className="data-row">
                <span className="label">Collateral (Liquid funds)</span>
                <span className="value">₹0.00</span>
              </div>
              <div className="data-row">
                <span className="label">Collateral (Equity)</span>
                <span className="value">₹0.00</span>
              </div>
              <div className="data-row">
                <span className="label">Total Collateral</span>
                <span className="value">₹0.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="funds-column">
          <div className="section-header">
            <h4 className="section-title">Commodity</h4>
          </div>

          <div className="commodity-card">
            <div className="commodity-icon">📦</div>
            <p className="commodity-text">You don't have a commodity account</p>
            <p className="commodity-subtext">
              Open a commodity account to trade in commodities
            </p>
            <Link className="btn btn-blue btn-large">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
