import Review from "../components/Review.js";
import styles from "../components/Reviews.module.css";

function Reviews({ item, authentication }) {
  return (
    <div className={styles.outterContainer}>
      <div className={styles.container}>
        {item.rating?.ratings.map((userRating, i) => (
          <Review
            item={item}
            rating={userRating}
            index={i}
            authentication={authentication}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Reviews;
