// TopBar.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const TopBar = ({ selectedSortOption, setSelectedSortOption, isOpen, setIsOpen, selectedLabel, handleSortChange, products }) => {
  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="topbar">
      <div className="sorting">
        <div className="custom-select">
          <label htmlFor="sort" className="lebel">Sort by:</label>
          <div className="select-wrapper" onClick={toggleSelect}>
            <div id="sort" className={`selection ${isOpen ? "open" : ""}`}>
              {selectedLabel}
              <FontAwesomeIcon icon={faAngleDown} className="icon" />
            </div>
            {isOpen && (
              <div className="options">
                <p
                  className={`option ${selectedSortOption === "name" ? "selected" : ""}`}
                  onClick={(e) => handleSortChange(e, "name")}
                >
                  Name
                </p>
                <p
                  className={`option ${selectedSortOption === "price" ? "selected" : ""}`}
                  onClick={(e) => handleSortChange(e, "price")}
                >
                  Price
                </p>
              </div>
            )}
          </div>
        </div>
        <p id="product-quantity">{products ? `${products.length} Products` : ""}</p>
      </div>
    </div>
  );
};

export default TopBar;
