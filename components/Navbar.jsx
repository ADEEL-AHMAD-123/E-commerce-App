import React, { useState } from "react";
import "./navbar.scss"; // Import your SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [icon, setIcon] = useState(faBars);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIcon(isNavOpen ? faBars : faTimes);
  };

  return (
    <div className={`navbar ${isNavOpen ? "open" : ""}`}>
      <div className="navbar-left">
        {/* Only show the button on small screens */}
        <button className="hamburger-btn" onClick={toggleNav}>
          <FontAwesomeIcon icon={icon} className="hamburger-icon" />
        </button>
      </div>
      {/* Show nav links only on larger screens or when menu is open */}
      <div className={`navbar-right ${isNavOpen ? "open" : ""}`}>
        <ul className={`nav-links ${isNavOpen ? "open" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/store">Store</a>
          </li>
          <li>
            <a href="/blogs">Blogs</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
