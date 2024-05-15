import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { saveShippingInfo } from '../slices/cartSlice'; 
import { useNavigate } from 'react-router-dom';

const ShippingPage = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const shippingInfo = useSelector((state) => state.cart.shippingInfo); 

  const initialValues = {
    country: shippingInfo.country || '', 
    state: shippingInfo.state || '',
    city: shippingInfo.city || '',
    address: shippingInfo.address || '',
    zipCode: shippingInfo.zipCode || '',
    phoneNumber: shippingInfo.phoneNumber || '',
  };

  const validationSchema = Yup.object({
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    zipCode: Yup.string().required('ZipCode is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(saveShippingInfo(values)); // Dispatch the action to save shipping info to Redux store

      // Display notification
      toast.success('Shipping information saved!', { 
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      // Redirect to the confirm order page
      navigate('/confirm-order'); // Use navigate instead of history.push
    },
  });

  useEffect(() => {
    // Autofill form if data is present in Redux store
    if (shippingInfo) {
      formik.setValues(shippingInfo);
    }
  }, [shippingInfo]); // Update the formik values when shippingInfo changes

  return (
    <>
      <BreadCrumb title="Shipping" />
      <Meta title="Shipping" />
      <div className="shipping-page wrapper">
        <div className="div">
          <h3 className="title">Shipping Information</h3>
          <div className="contactpage-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Country"
                  {...formik.getFieldProps('country')}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="error">{formik.errors.country}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  {...formik.getFieldProps('state')}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="error">{formik.errors.state}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  {...formik.getFieldProps('city')}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="error">{formik.errors.city}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="error">{formik.errors.address}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZipCode</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Zipcode"
                  {...formik.getFieldProps('zipCode')}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <div className="error">{formik.errors.zipCode}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  {...formik.getFieldProps('phoneNumber')}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="error">{formik.errors.phoneNumber}</div>
                )}
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
