import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function CategoryCard({ category, items }) {
  let categoryItems = items.filter((item) => item.category === category);

  if (categoryItems.length === 0) {
    categoryItems = [
      items[items.length - 1],
      items[items.length - 2],
      items[items.length - 3],
      items[items.length - 4],
    ];
  }

  return (
    <Link
      to={
        category === "All items"
          ? "/explore"
          : `/explore/category/${category}/page/1`
      }
      className={`card ${styles.categoryCard}`}
    >
      <div className={styles.imgContainer}>
        <img
          src={categoryItems[categoryItems.length - 1]?.image}
          alt={categoryItems[categoryItems.length - 1]?.title}
        />
        <img
          src={categoryItems[categoryItems.length - 2]?.image}
          alt={categoryItems[categoryItems.length - 2]?.title}
        />
        <img
          src={categoryItems[categoryItems.length - 3]?.image}
          alt={categoryItems[categoryItems.length - 3]?.title}
        />
        <img
          src={categoryItems[categoryItems.length - 4]?.image}
          alt={categoryItems[categoryItems.length - 4]?.title}
        />
      </div>

      <div className="card-body">
        <h3 className={`card-text ${styles.categoryTitle}`}>{category}</h3>
      </div>
    </Link>
  );
}

export default CategoryCard;
