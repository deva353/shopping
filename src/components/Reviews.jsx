
import { useState } from "react";

function Reviews({ productId }) {
  const storageKey = `reviews-${productId}`;

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  const addReview = (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      alert("Please enter your name and review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedReviews)
    );

    setName("");
    setRating("5");
    setComment("");
  };

  return (
    <section className="reviews-section">
      <h2>Customer Reviews</h2>

      <form onSubmit={addReview} className="review-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Average</option>
          <option value="1">1 - Poor</option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />

        <button type="submit">Submit Review</button>
      </form>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <h4>{review.name}</h4>
              <p className="review-rating">
                {"⭐".repeat(review.rating)}
              </p>
              <p>{review.comment}</p>
              <small>{review.date}</small>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Reviews;
