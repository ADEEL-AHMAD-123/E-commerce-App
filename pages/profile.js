import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAsyncActions,resetUserState } from "../slices/userSlice.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/Error.jsx";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useNavigate } from "react-router-dom";
import { resetCartState } from "../slices/cartSlice";
import { resetCompareState } from "../slices/compareSlice";
import { resetOrderState } from "../slices/orderSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, logoutSuccess } = useSelector((state) => state.user);
  const User = user ? user.user : null; // Assuming user is an object

  useEffect(() => {
  }, []);

  useEffect(() => { 
    if (logoutSuccess) {
      // Dispatch actions to reset states after successful logout
      dispatch(resetCartState());
      dispatch(resetCompareState());
      dispatch(resetOrderState());
      dispatch(resetUserState());
      navigate("/");
    }
  }, [logoutSuccess, navigate, dispatch]);
  

  const handleLogout = () => {
    dispatch(userAsyncActions.logoutUser({ requestData: "" }));
  };

  return (
    <>
      <Meta title="profile" />
      <BreadCrumb title="profile" />
      <div className="profile-page">
        <div className="profile-header">
          <h1>Profile Page</h1>
          {User ? (
            <h2>Welcome, {`${User.firstName} ${User.lastName}`}</h2>
          ) : (
            <h2>Welcome, Guest</h2>
          )}
        </div>
        {loading && <Loader />} {/* Show loader if data is loading */}
        {error && <ErrorMessage message={error} />} {/* Show error message if there's an error */}
        {User && (
          <div className="user-info">
            <h2>User Information</h2>
            <p>
              <strong>Name:</strong> {`${User.firstName} ${User.lastName}`}
            </p>
            <p>
              <strong>Email:</strong> {User.email}
            </p>
            {/* Additional user information display */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
