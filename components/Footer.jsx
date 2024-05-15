import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowUp, faSearch } from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faYoutube,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import "../App.scss"; // Import the SCSS styles
import app from "../images/app.jpg";
import play from "../images/play.jpg";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <section className="news-section">
        <div className="left">
          <FontAwesomeIcon icon={faArrowUp} className="icon" />
          <h5>Sign Up For Newsletter</h5>
        </div>
        <div className="right">
          <div className="subscribe">
            <input type="text" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
        <h3></h3>
      </section>
      <section className="links">
        <div id="div1" className="dev">
          <h6>Contact Us</h6>
          <p>
            Demo Store
            <br />
            No. 1259 Freedom, Newyork, 1111
            <br />
            United States
          </p>
          <p>+92-123456789</p>
          <p>Demo@Example.com</p>
          <div className="social-icons">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="socialicon" />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faYoutube} className="socialicon" />
            </Link>
            <Link>
              {" "}
              <FontAwesomeIcon icon={faInstagram} className="socialicon" />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faTwitter} className="socialicon" />
            </Link>
          </div>
        </div>
        <div id="div2" className="dev">
          <h6>Information</h6>
          <Link to="privacy-policy">
            <p>Privacy Policy</p>
          </Link>
          <Link to="shipping-policy">
            <p>Shipping Policy</p>
          </Link>
          <Link to="refund-policy">
            <p>Refund Policy</p>
          </Link>
          <Link to="terms-and-conditions">
            <p>Terms & Conditions</p>
          </Link>
          <Link to="blogs">
            <p>Blogs</p>
          </Link>
        </div>
        <div id="div3" className="dev">
          <h6>Account</h6>
          <p>Search</p>
          <p>About Us</p>
          <p>Faqs</p>
          <p>Contact</p>
          <p>Size Chart</p>
        </div>
        <div id="div4" className="dev">
          <h6>Quick Links</h6>
          <p>Accessories</p>
          <p>Laptops</p>
          <p>Headphones</p>
          <p>Smart Watches</p>
          <p>Tablets</p>
        </div>
        <div id="div5" className="dev">
          <h6>Our Apps</h6>

          <p>
            Download the app and get extra 15% discount
            <br />
            on your first order
          </p>
       <div className="img">
       <img src={app} alt="" />
       <img src={play} alt="" />
       </div>
        </div>
      </section>
      <section className="copyright">
        <p> © 2023 Example Company - All Rights Reserved.</p>
      </section>
    </div>
  );
};

export default Footer;
