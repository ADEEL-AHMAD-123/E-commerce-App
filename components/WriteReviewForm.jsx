import React, { useState } from 'react';


function WriteReviewForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '' && review.trim() !== '') {
      onSubmit({ name, review });
      setName('');
      setReview('');
    }
  };

  return (
    <form className="write-review-form" onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <div className="input-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default WriteReviewForm;
