
import React from "react";

const Sidebar = () => {
  return (

<div className="sidebar">
          <div className="filter-card">
            <h3 className="filter-title">Shop By Categories</h3>
            <div>
              <ul>
                <li>Watch</li>
                <li>Tv</li>
                <li>Camera</li>
                <li>Laptop</li>
              </ul>
            </div>
          </div>
          <div className="filter-card">
            <h3 className="filter-title">Filter By</h3>
            <div className="availability">
              <h5 className="subtitle">Availability</h5>
              <div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked
                  />
                  <label htmlFor="" className="form-check-label">
                    In Stock (1)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="outOfStock"
                  />
                  <label htmlFor="outOfStock" className="form-check-label">
                    Out of Stock (0)
                  </label>
                </div>
              </div>
              <h5 className="subtitle">Price</h5>
              <div>
                <div className="price-form">
                  <div className="form-floating">
                  <label htmlFor="from"> $</label>
                    <input type="text" placeholder="From"/>
                  </div>
                  <div className="form-floating">
                  <label htmlFor="To"> $</label>
                    <input type="text" placeholder="To"/>
                  </div>
                </div>
              </div>
              <h5 className="subtitle">Colors</h5>
             <div className="colors">
             <ul >
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
             </div>
             <h5 className="subtitle">Size</h5>
              <div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked
                  />
                  <label htmlFor="" className="form-check-label">
                     S (3)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="outOfStock"
                  />
                  <label htmlFor="outOfStock" className="form-check-label">
                    M (0)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="outOfStock"
                  />
                  <label htmlFor="outOfStock" className="form-check-label">
                    L (10)
                  </label>
                </div>
              </div>
            </div>
          </div>

          
        </div>

  );
};

export default Sidebar;
