import axios from "axios";
import { useState } from "react";
import styles from "./Review.module.css";

import EditReview from "./EditReview";

function Review({ item, rating, index, authentication, triggerRefresh }) {
  const currentRating = item.rating?.ratings[index];
  const [confirmation, setConfirmation] = useState(false);
  const [editting, setEditting] = useState(false);

  function toggleEditting() {
    setEditting(false);
  }

  function deleteRating() {
    axios
      .post("/api/deleteRating", {
        productId: item._id,
        ratingId: currentRating._id,
        rating: currentRating.rating,
        message: currentRating.message,
        date: currentRating.date,
        author: currentRating.author.userID,
      })
      .then((response) => triggerRefresh(currentRating))
      .catch((error) => {
        console.log("Error:", error.message);
        console.log("Response:", error.response); // Log the response for more details
      });
  }

  return (
    <div>
      {editting ? (
        <EditReview
          currentRating={currentRating}
          authentication={authentication}
          item={item}
          triggerRefresh={triggerRefresh}
          toggleEditting={toggleEditting}
          ratingId={currentRating._id}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.ratingStarsContainer}>
            {Array.from({ length: 5 }, (curr, i) => (
              <svg
                key={i}
                className={styles.ratingStar}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < currentRating?.rating ? "#fcd53f" : "none"}
                viewBox="0 0 24 24"
                stroke="#fcd53f"
              >
                <path
                  stroke="#646464"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ))}
            {authentication.authenticated &&
              authentication.user._id === currentRating.author.userID && (
                <div className={styles.authorOptions}>
                  <button onClick={() => setEditting(true)}>Edit</button>
                  <button onClick={() => setConfirmation(true)}>Delete</button>
                  {confirmation && (
                    <div className={styles.confirmation}>
                      <button onClick={() => deleteRating()}>YES</button>
                      <button onClick={() => setConfirmation(false)}>NO</button>
                    </div>
                  )}
                </div>
              )}
          </div>
          <div className={styles.ratingHeaderContainer}>
            <p className={styles.username}>
              {" "}
              {currentRating?.author?.username}{" "}
            </p>
            <p className={styles.ratingDate}>{currentRating?.date}</p>
          </div>
          <div className={styles.message}>
            {currentRating?.message}{" "}
            {currentRating?.edit?.edited && (
              <span className={styles.editedSpan}>
                (edited on {currentRating?.edit?.date})
              </span>
            )}{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
