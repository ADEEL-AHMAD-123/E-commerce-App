// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getUserProfile } from '../slices/userSlice';

// const UserProfile = () => {
//   const user = useSelector((state) => state.user.user);
//   const isLoading = useSelector((state) => state.user.isLoading);
//   const error = useSelector((state) => state.user.error);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch the user's profile when the component mounts
//     dispatch(getUserProfile());
//   }, [dispatch]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     console.log(`${Error}:${error}`);

//   }
// console.log(user);
//   return (
//     <div>
//       {user !== null ? ( // Check if user is not null (logged in)
//         <>
//           <h2>Welcome, {user.name}!</h2>
//           <p>Email: {user.email}</p>
//           {/* Display other user profile information here */}
//         </>
//       ) : (
//         <>
//           <p>Please log in to view your profile.</p>
//           <a href="/login">Log In</a>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
