import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { productAsyncActions } from '../slices/productsSlice';
import ProductListing from "../components/ProductListing.jsx";

const OurStore = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track if filter is applied
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const resultPerPage = useSelector(state => state.products.resultPerPage);
  const totalProducts = useSelector(state => state.products.totalProducts);
  const totalPages = Math.ceil(totalProducts / resultPerPage);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    setSearchKeyword(searchQuery || "");
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(1);
    if (isFilterApplied) {
      applyFilter(); // Apply filter when page loads or filter changes
    }
  }, [searchKeyword, selectedCategory, isFilterApplied, minPrice, maxPrice]); // Reset page on filter change

  useEffect(() => {
    let requestData = `?page=${currentPage}&limit=${8}&keyword=${searchKeyword}&rating[gte]=0&rating[lte]=5`;

    if (selectedCategory) {
      requestData += `&category=${selectedCategory}`;
    }

    if (isFilterApplied && minPrice !== "" && maxPrice !== "") {
      requestData += `&price[gte]=${minPrice}&price[lte]=${maxPrice}`;
    }

    dispatch(productAsyncActions.fetchProducts({ requestData }));
  }, [dispatch, currentPage, resultPerPage, searchKeyword, selectedCategory, isFilterApplied, minPrice, maxPrice]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const applyFilter = () => {
    setIsFilterApplied(true);
    setMinPrice(minPriceInput); // Set the minPrice and maxPrice from input fields when filter is applied
    setMaxPrice(maxPriceInput);
  };

  const removeFilter = () => {
    setIsFilterApplied(false);
    setMinPrice("");
    setMaxPrice("");
    setMinPriceInput("");
    setMaxPriceInput("");
  };

  const handleApplyFilter = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (validatePriceInputs()) {
      applyFilter();
    }
  };

  const validatePriceInputs = () => {
    if (minPriceInput !== "" && maxPriceInput !== "") {
      if (parseFloat(minPriceInput) >= parseFloat(maxPriceInput)) {
        alert("Minimum price should be less than maximum price.");
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <div className="store wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="filter-card">
            <h3 className="filter-title">Shop By Categories</h3>
            <div>
              <ul>
                <li onClick={() => handleCategorySelect("Watch")}>Watch</li>
                <li onClick={() => handleCategorySelect("flowers")}>Flowers</li>
                <li onClick={() => handleCategorySelect("computer")}>Computer</li>
                <li onClick={() => handleCategorySelect("electric")}>Electric</li>
              </ul>
            </div>
          </div>
          <div className="filter-card">
            <h3 className="filter-title">Filter By</h3>
            <div className="availability">
              <h5 className="subtitle">Price</h5>
              <form onSubmit={handleApplyFilter}>
                <div className="price-form">
                  <div className="form-floating">
                    <label htmlFor="from"> $</label>
                    <input
                      type="text"
                      placeholder="From"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                    />
                  </div>
                  <div className="form-floating">
                    <label htmlFor="To"> $</label>
                    <input
                      type="text"
                      placeholder="To"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                    />
                  </div>
                  {isFilterApplied ? (
  <button onClick={removeFilter} className="button apply-button">
    Remove Price Filter
  </button>
) : (
  (minPriceInput !== "" || maxPriceInput !== "") && (
    <button type="submit" className="button apply-button">
      Apply Price Filter
    </button>
  )
)}

                </div>
              </form>
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
        {/* Main Section */}
        <div id="main-section">
          <ProductListing />
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button type="button" onClick={handlePreviousPage} disabled={currentPage === 1} className="button">
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button type="button" className="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OurStore;
