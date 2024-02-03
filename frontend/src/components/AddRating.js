import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AddRating.module.css";
import StarRating from "./StarRating";

function AddRating({ item, authentication, triggerRefresh }) {
  const [myReview, setMyReview] = useState("");
  const [myRating, setMyRating] = useState(0);

  function onSetRating(rating) {
    setMyRating(rating);
  }

  function submitHandler(e) {
    e.preventDefault();

    if (authentication.authenticated) {
      axios
        .post("https://localhost:3000/api/addRating", {
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
  return authentication.authenticated ? (
    <div className={styles.outterContainer}>
      <div className={styles.container}>
        <h6>Add a review</h6>
        <form className={styles.form}>
          <textarea
            value={myReview}
            placeholder="Your review here (optional)"
            className={styles.input}
            onChange={(e) => setMyReview(e.target.value)}
          />
          <StarRating
            size={38}
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
  ) : (
    <div className={styles.dimmed}>
      <p>You need to be logged in, in order to leave a review</p>
      <p>
        Please <Link to="/signIn">Sign in</Link> or{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default AddRating;
