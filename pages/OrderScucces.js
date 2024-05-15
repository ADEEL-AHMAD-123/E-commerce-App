import React, { useState } from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useSelector } from 'react-redux';


const OrderSuccess = () => {
    // Assuming you have access to order state in Redux store
    const order = useSelector(state => state.order.order);
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(order._id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };

    return (
        <>
            <Meta title="Order Success" />
            <BreadCrumb title="Order Success" />
            <div className="wrapper">
                <div className="order-success-page">
                    <h2>Order Successful!</h2>
                    <p>Your order tracking ID: 
                        <span>{order.order._id}</span>
                        <button className="copy-button" onClick={handleCopyToClipboard}>
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </p>
                    <div className="button-row">
                        <button onClick={() => window.location.href = '/store'} className="continue-shopping-button">
                            Continue Shopping
                        </button>
                        <button onClick={() => window.location.href = '/'} className="go-to-home-button">
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSuccess;
