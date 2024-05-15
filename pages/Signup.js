import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userAsyncActions } from '../slices/userSlice'; // Import the async thunk action
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const Signup = () => {
  const dispatch = useDispatch();

  // Define the initial form values and validation schema using Yup
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userAsyncActions.registerUser({data:values})) // Dispatch the registerUser async thunk action
        .unwrap()
        .then(() => {
          // Handle success, if needed
        })
        .catch((error) => {
          console.log('Registration failed');
          // Handle registration failure, display an error message, etc.
        });
    },
  });

  return (
    <>
      <BreadCrumb title="SignUp" />
      <Meta title="SignUp" />
      <div className="signup wrapper">
        <div className="div">
          <h3 className="title">Create Account</h3>
          <div className="contactpage-form">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="error">{formik.errors.firstName}</div>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="error">{formik.errors.lastName}</div>
                )}
              </div>
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
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
