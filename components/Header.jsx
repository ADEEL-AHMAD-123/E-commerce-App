import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
  faHeart,
  faUser,
  faCartShopping,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { BiSolidCategory } from "react-icons/bi";
import '../App.scss'
import Navbar from "./Navbar";
import SearchBox from "./SearchBox"; 

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const orderInfo = useSelector((state) => state.cart.orderInfo);
  const user = useSelector((state) => state.user.user); 

  const navigate = useNavigate();
  const [cartLength, setCartLength] = useState(cartItems.length);
  const [subtotal, setSubtotal] = useState(orderInfo ? orderInfo.subtotal : "00");

  useEffect(() => {
    setCartLength(cartItems.length);
    setSubtotal(orderInfo ? orderInfo.subtotal : "00");
  }, [cartItems, orderInfo]);

  return (
    <div className="headerr header-container">
      <div className="topbar">
        <div className="slider-container">
          <p className="slider-text">
            Free Shipping Over $1000 & Free Returns
          </p>
          <p className="phone-number">
            Phone: <a href="">+92 311 9338637</a>
          </p>
        </div>
      </div>

      <div className="middlebar">
        <div className="logo">Digitic.</div>

        <SearchBox />
        <div className="line2">
          <Link to="compare-products">
            <div id="compare" className="bar-icons">
              <FontAwesomeIcon icon={faCode} className="icon" />
              <p>
                Compare
                <br />
                Products
              </p>
            </div>
          </Link>

          <Link to="wishlist">
            <div id="favourite" className="bar-icons">
              <FontAwesomeIcon icon={faHeart} className="icon" />
              <p>
                Favourite
                <br />
                Wishlist
              </p>
            </div>
          </Link>

          {user ? (
            <div id="my-account" className="bar-icons" onClick={() => navigate("/profile")}>
              <FontAwesomeIcon icon={faUser} className="icon" />
              <p>
                My Account
              </p>
            </div>
          ) : (
            <Link to="/login">
              <div id="login" className="bar-icons">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <p>
                  Log in
                
                </p>
              </div>
            </Link>
          )}

          <Link to="cart">
            <div id="cart" className="bar-icons">
              <FontAwesomeIcon icon={faCartShopping} className="icon" />
              <div>
                <p> {cartLength} </p>
                <p>${subtotal}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
