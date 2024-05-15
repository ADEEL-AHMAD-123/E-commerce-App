import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../slices/wishlistSlice';
import { addToCart } from '../slices/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';



const Product = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const addToCartAndStore = useCallback((e) => {
    e.stopPropagation();
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart({ item: productWithQuantity }));
  }, [dispatch, product]);

  const handleToggleWishlist = useCallback((e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  }, [dispatch, product]);

  const isInWishlist = wishlist.some((item) => item._id === product?._id);

  return (
    <div className="product-card">
      <div className="wishlist" >
        <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} onClick={handleToggleWishlist} />
        <FontAwesomeIcon icon={faShoppingCart} onClick={addToCartAndStore} />
      </div>
      <div className="product-image">
        <img className="default-image" src={product?.images?.[0]?.url || ''} alt="" />
        <img className="hover-image" src={product?.images?.[1]?.url || ''} alt="" />
      </div>

      <Link to={`/product/${product?._id}`}>
        <div className="product-details">
          <h6>{product?.category}</h6>
          <h5>{product?.name}</h5>
          <ReactStars
            classNames="star"
            count={5}
            size={14}
            activeColor="#ffd700"
            value={product?.ratings}
            edit={false}
            half={true}
          />
          <p>${product?.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
