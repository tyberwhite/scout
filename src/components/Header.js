import React from "react";
import image from "../img/scout-logo.png";

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <img src={image} alt="scout logo" />
          <h1>Scout</h1>
        </div>
        <div className="header-links">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/jesse-tyber-white/">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/tyberwhite">
                <i class="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
