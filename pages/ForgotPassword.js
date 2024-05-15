import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { userAsyncActions } from "../slices/userSlice"

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the forgotPassword action with the email
    dispatch(userAsyncActions.forgotPassword(email));
  };

  return (
    <>
      <BreadCrumb title="ForgotPassword" />
      <Meta title="ForgotPassword" />
      <div className="signup wrapper">
        <div className='div'>
          <h3 className="title">Reset Your Password</h3>
          <div className="contactpage-form">
            <form onSubmit={handleSubmit}>
              <p>We will send you an Email to reset your password </p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="form-button">
                <button type="submit">Submit</button>
              </div>
            </form>
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
