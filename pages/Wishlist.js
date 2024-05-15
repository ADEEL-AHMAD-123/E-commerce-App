import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../slices/wishlistSlice';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleToggleWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
    // Optionally, display a toast message or perform any other action after toggling wishlist
  };

  return (
    <>
      <BreadCrumb title="Wishlist" />
      <Meta title="Wishlist" />

      <div className="wishlist-wrapper wrapper">
        {wishlistItems.length === 0 ? (
          <div>No products added to wishlist.</div>
        ) : (
          wishlistItems.map((product) => (
            <div className="compare-product-card" key={product._id}>
              <div className="cross" onClick={() => handleToggleWishlist(product._id)}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <div className="compare-product-card-image">
                <img src={product.image} alt="" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">{product.name}</h5>
                <h6 className="price">${product.price}</h6>
                {/* Add other product details */}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Wishlist;
