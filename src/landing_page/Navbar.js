import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-light border-bottom">
      <div class="container p-2">
        <Link class="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            alt="Logo"
            style={{ width: "25%" }}
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <ul class="navbar-nav mb-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link active"
                  aria-current="page"
                  to={"/signup"}
                >
                  Signup
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to={"/about"}>
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to={"/product"}>
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to={"/pricing"}>
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to={"/support"}>
                  Support
                </Link>
              </li>
              <li class="nav-item kite-nav-item">
                <a
                  class="nav-link active kite-link"
                  href="https://kite.zerodha.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    class="kite-icon"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Orange top triangle */}
                    <polygon points="30,20 75,40 40,75" fill="#FF5722" />
                    {/* Darker red bottom triangle */}
                    <polygon points="40,75 75,40 75,85 30,95" fill="#E63946" />
                  </svg>
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
