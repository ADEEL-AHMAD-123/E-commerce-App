import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localSuggestions, setLocalSuggestions] = useState([]);
  const navigate = useNavigate();
  const suggestionsRef = useRef();
  const debounceDelay = 600; // Adjust debounce delay as needed
  let debounceTimer = useRef(null);
  let cancelTokenSource = useRef(null);

  useEffect(() => {
    const storedSearchValue = localStorage.getItem("storedSearchValue");
    if (storedSearchValue && window.location.pathname === "/store") {
      setSearchValue(storedSearchValue);
    }
  }, []);
  

  const debouncedInputChange = (value) => {
    clearTimeout(debounceTimer.current); // Clear the existing timer
    if (value === searchValue) {
      return;
    }
    debounceTimer.current = setTimeout(async () => {
      try {
        if (!value) {
          setLocalSuggestions([]);
          setShowSuggestions(false);
          return;
        }

        cancelTokenSource.current = axios.CancelToken.source();
        const response = await axios.get(`http://localhost:8000/api/v1/products?limit=8&keyword=${value}`, {
          withCredentials: true,
          cancelToken: cancelTokenSource.current.token,
        });
        const fetchedSuggestions = response.data.products.map((product) => ({ id: product.id, name: product.name }));
        setLocalSuggestions(fetchedSuggestions);
        setShowSuggestions(true);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching suggestions:", error);
          setLocalSuggestions([]);
          setShowSuggestions(false);
        }
      }
    }, debounceDelay);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    debouncedInputChange(value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/store?search=${searchValue}`);

    // Save search value to local storage when search button is clicked
    localStorage.setItem("storedSearchValue", searchValue);
  };

  const handleSuggestionClick = (productName) => {
    setSearchValue(productName);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(debounceTimer.current); // Clear the timer on component unmount
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel("Component unmounted");
      }
    };
  }, []);

  return (
    <div className="searchbox-container">
      <form onSubmit={handleSearch} className="searchbox">
        <input
          type="text"
          placeholder="Search Products Here..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(searchValue !== "" && localSuggestions.length > 0)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </button>
      </form>
      {showSuggestions && localSuggestions.length > 0 && (
        <div className="suggestions-container" ref={suggestionsRef}>
          <ul>
            {localSuggestions.map((suggestion) => (
              <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.name)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
