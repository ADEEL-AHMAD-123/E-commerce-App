import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { orderAsyncActions } from '../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.user.user);
  const cartItems = useSelector(state => state.cart.items);
  const shippingInfo = useSelector(state => state.cart.shippingInfo);
  const orderInfo = useSelector(state => state.cart.orderInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientSecret();
  }, [cartItems]);

  const order = {
    itemsPrice: orderInfo.subtotal.toString(),
    taxPrice: orderInfo.tax.toString(),
    shippingPrice: orderInfo.shippingCharges.toString(),
    totalPrice: orderInfo.total.toString(),
    orderItems: cartItems.map(cartItem => ({
      product: cartItem._id, 
      name: cartItem.name,
      price: cartItem.price.toString(), 
      image: cartItem.images[0], 
      quantity: cartItem.quantity
    })),
    shippingInfo: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: "pakistan", 
      zipCode: shippingInfo.zipCode,
      phoneNumber: shippingInfo.phoneNumber 
    },
    user: user._id
  };

  const fetchClientSecret = async () => {
    try {
      setIsLoading(true);
      const token = getTokenFromCookies();
      if (!token) {
        throw new Error('Authentication token not found in cookies');
      }
      const response = await axios.post('http://localhost:8000/api/v1/payment/process', {
        amount: calculateTotal() * 100,
        currency: "usd",
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.data.client_secret) {
        setClientSecret(response.data.client_secret); 
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching client secret');
    } finally {
      setIsLoading(false);
    }
  };

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };
  
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    return subtotal + tax + shippingCharges;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    try {
      setIsLoading(true);
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.pinCode,
            country: "pk",
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setIsLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        dispatch(orderAsyncActions.createNewOrder(order));
        navigate('/order/success');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>CHECKOUT</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <CardNumberElement
            id="cardNumber"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  fontFamily: 'Arial, sans-serif',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">Expiration Date</label>
          <CardExpiryElement
            id="expiry"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  fontFamily: 'Arial, sans-serif',
                },
              },
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <CardCvcElement
            id="cvc"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  fontFamily: 'Arial, sans-serif',
                },
              },
            }}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Checkout Now'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Checkout;
