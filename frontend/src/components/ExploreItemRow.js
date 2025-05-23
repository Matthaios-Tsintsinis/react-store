import { Link } from "react-router-dom";
import styles from "./ExploreItemRow.module.css";

import ShowMore from "./ShwMore.js";

function ExploreItemRow({ item }) {
  const wordLimit = 400;

  return (
    <Link to={`/product/${item.id}`} className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={item.image} className={styles.itemImage} alt={item.title} />
      </div>
      <div className={styles.info}>
        <h3>{item.title}</h3>

        <ShowMore
          wordLimit={wordLimit}
          text={item.description}
          className={styles.description}
        />

        <p>
          ⭐️ {(Math.round(item.rating?.rate * 100) / 100).toFixed(2)}{" "}
          <span className={styles.ratingsSpan}>
            {item.rating?.count} Rating(s)
          </span>
        </p>
        <h3 style={{ position: "relative" }}>{item.price}$</h3>
      </div>
    </Link>
  );
}

export default ExploreItemRow;
