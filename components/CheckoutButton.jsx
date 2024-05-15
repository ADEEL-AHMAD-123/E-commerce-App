import React from 'react';
import axios from 'axios';

const CheckoutButton = ({ cartItems }) => {
  const getTokenFromCookies = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  };

  const createSession = async () => {
    const token = getTokenFromCookies();

    if (!token) {
      throw new Error('Authentication token not found in cookies');
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/payment/create_checkout_session', {
        cartItems
      ,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <button onClick={createSession}>
      Checkout Now
    </button>
  );
};

export default CheckoutButton;
