import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userAsyncActions } from '../slices/userSlice';

import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userAsyncActions.loginUser({data:values}))
    },
  });

  return (
    <>
      <BreadCrumb title="LogIn" />
      <Meta title="LogIn" />
      <div className="signup wrapper">
        <div className="div">
          <h3 className="title">LogIn</h3>
          <div className="contactpage-form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
              </div>
              <Link to="/forgot-password">Forgot Your Password?</Link>
              <div className="form-button">
                <button type="submit">LogIn</button>
                <button type="button">
                  <Link to="/sign-up">Signup</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
