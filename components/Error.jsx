import React from 'react';

const Error = (props) => {
  return (
    <div className="error-container">
      <h1 className="error-heading">Error</h1>
      <p className="error-message">{props.message?props.message:"Oops! Something went wrong." }</p>
    </div>
  );
};

export default Error;
