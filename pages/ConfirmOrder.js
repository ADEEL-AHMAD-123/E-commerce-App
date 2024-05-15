import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import { saveOrderInfo } from "../slices/cartSlice";

const ConfirmOrderPage = () => {
  const { shippingInfo, items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const total = subtotal + tax + shippingCharges;

  useEffect(() => {
    // Store order information in localStorage
    const orderInfo = {
      subtotal: subtotal,
      shippingCharges: shippingCharges,
      tax: tax,
      total: total,
    };
    dispatch(saveOrderInfo(orderInfo));
  }, [subtotal, shippingCharges, tax, total]);

  return (
    <>
      <BreadCrumb title="Confirm Order" />
      <Meta title="Confirm Order" />
      <div className="confirm-order-page wrapper">
        <div className="shipping-info">
          <h3 className="section-title">Shipping Information</h3>
          <div className="info-container">
            <div>
              <strong>Country:</strong> {shippingInfo.country}
            </div>
            <div>
              <strong>State:</strong> {shippingInfo.state}
            </div>
            <div>
              <strong>City:</strong> {shippingInfo.city}
            </div>
            <div>
              <strong>Address:</strong> {shippingInfo.address}
            </div>
            <div>
              <strong>Zipcode:</strong> {shippingInfo.zipCode}
            </div>
            <div>
              <strong>Phone Number:</strong> {shippingInfo.phoneNumber}
            </div>
          </div>
        </div>

        <div className="cart-items">
          <h3 className="section-title">Cart Items</h3>
          <div className="item-container">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.images.length > 0 ? item.images[0].url : ""}
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-quantity">Quantity: {item.quantity}</div>
                  <div className="item-price">
                    Price: ${item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <h3 className="section-title">Order Summary</h3>
          <div className="summary-container">
            <div>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </div>
            <div>
              <strong>Shipping Charges:</strong> ${shippingCharges.toFixed(2)}
            </div>
            <div>
              <strong>GST (18%):</strong> ${tax.toFixed(2)}
            </div>
            <div className="total">
              <strong>Total:</strong> ${total.toFixed(2)}
            </div>
          </div>
        </div>
        <Link to="/checkout">
          <button className="proceed-to-payment">Checkout</button>
        </Link>
      </div>
    </>
  );
};

export default ConfirmOrderPage;
