// ResetPassword.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { userAsyncActions } from '../slices/userSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Extract the token from the URL
  const token = new URLSearchParams(location.search).get('token');

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      // Use the extracted token in the resetPassword action
      if (token) {
        dispatch(userAsyncActions.resetPassword({ token, newPassword: values.newPassword, confirmPassword: values.confirmPassword }));
      }
    },
  });

  return (
    <>
      <BreadCrumb title="ResetPassword" />
      <Meta title="ResetPassword" />
      <div className="signup wrapper">
        <div className="div">
          <h3 className="title">Reset Your Password</h3>
          <div className="contactpage-form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div>{formik.errors.newPassword}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div>{formik.errors.confirmPassword}</div>
                ) : null}
              </div>

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

export default ResetPassword;
