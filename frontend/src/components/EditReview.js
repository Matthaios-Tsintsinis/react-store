import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EditReview.module.css";
import StarRating from "./StarRating";

function EditReview({
  currentRating,
  authentication,
  item,
  triggerRefresh,
  toggleEditting,
}) {
  const [myReview, setMyReview] = useState(currentRating.message);
  const [myRating, setMyRating] = useState(0);

  function onSetRating(rating) {
    setMyRating(rating);
  }

  function submitHandler(e) {
    e.preventDefault();

    console.log("Editting...");

    if (authentication.authenticated) {
      axios
        .post("https://localhost:3000/api/editRating", {
          username: authentication.user.username,
          rating: myRating,
          itemID: item.id,
          userID: authentication.user._id,
          message: myReview,
        })
        .then((response) => {
          triggerRefresh();
        })
        .catch((error) => {
          console.log("Error:", error.message);
          console.log("Response:", error.response); // Log the response for more details
        });
    }
  }
  //   style={{ pointerEvents: "none" }}
  return (
    <div className={styles.outterContainer}>
      <div className={styles.container}>
        <div className={styles.cancelButtonContainer}>
          <h6>Edit your review</h6>
          <button className={styles.cancelButton} onClick={toggleEditting}>
            Cancel
          </button>
        </div>
        <form className={styles.form}>
          <textarea
            value={myReview}
            type="text"
            placeholder="Your review here (optional)"
            className={styles.input}
            onChange={(e) => setMyReview(e.target.value)}
          />
          <StarRating
            size={30}
            messages={["Terrible", "Bad", "Neutral", "Good", "Amazing"]}
            onSetRating={onSetRating}
          />
          {myRating > 0 && (
            <button
              className={styles.submit}
              type="submit"
              onClick={(e) => submitHandler(e)}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditReview;
