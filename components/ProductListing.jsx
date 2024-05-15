import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';
import Loader from "../components/Loader";
import Error from "../components/Error";

const ProductListing = ({ filterByFeatured = false, startIndex = 0, endIndex = null }) => {
  const { products, isLoading, error } = useSelector(state => state.products);

  if (isLoading) return <Loader />;
  if (error) return <Error message={error} />;

  // Filter products based on the filterByFeatured prop
  let filteredProducts = products;
  if (filterByFeatured) {
    filteredProducts = filteredProducts.filter(product => product.isFeatured === true);
  }

  // Apply range if specified
  if (endIndex !== null) {
    filteredProducts = filteredProducts.slice(startIndex, endIndex);
  } else {
    filteredProducts = filteredProducts.slice(startIndex);
  }

  return (
    <div className="store-listing">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div key={index} className="store-product-div">
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <div className="no-products-message">
          <h2>No products available.</h2>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
