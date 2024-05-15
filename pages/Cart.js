import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../slices/cartSlice';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityIncrement = (itemId) => {

    dispatch(incrementQuantity({ itemId }));
  };

  const handleQuantityDecrement = (itemId) => {
    dispatch(decrementQuantity({ itemId }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <div className="wrapper">
        <div className="cart-page">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-section">
                <h3>Products</h3>
                {cartItems.map(item => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.images[0].url} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>Color: {item.color}</p>
                    </div>
                    <div className="cart-item-details">
                      <p>Price: ${item.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-details">
                      <div className="quantity-control">
                        <button onClick={() => handleQuantityDecrement(item._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityIncrement(item._id)}>+</button>
                      </div>
                    </div>
                    <div className="cart-item-details">
                      <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="cart-item-details">
                      <button className="remove-button" onClick={() => handleRemoveItem(item._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-section">
                <h4>Subtotal: ${calculateSubtotal().toFixed(2)}</h4>
                <p>Taxes and shipping calculated at checkout.</p>
              </div>

              <div className="cart-section">
                <Link to="/store" className="continue-shopping-button">
                  Continue Shopping
                </Link>
                <Link to="/shipping" className="proceed-to-checkout-button">
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
