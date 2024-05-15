import React from "react";
import ReactStars from "react-rating-stars-component";

function CustomerReview({ name, rating, comment, key }) {
  return (
    <div className="customer-review">
      <h3 className="customer-name">{name}</h3>
      <ReactStars
        classNames={"star"}
        count={5}
        key={key}
        size={12}
        activeColor="#ffd700" 
        value={rating}
        edit={false}
        half={true}
      />
      <p className="customer-review-text">{comment}</p>
    </div>
  );
}

export default CustomerReview;
