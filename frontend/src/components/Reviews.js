import Review from "../components/Review.js";
import styles from "../components/Reviews.module.css";

function Reviews() {
  return (
    <div className={styles.outterContainer}>
      <div className={styles.container}>
        <h4>Reviews</h4>
        <hr />
        <Review />
      </div>
    </div>
  );
}

export default Reviews;
