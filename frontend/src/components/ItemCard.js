import { useState } from "react";
import styles from "./ItemCard.module.css";

function ItemCard({ item }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.container}>
      <div className="card">
        <img
          className={`card-img-top ${styles.image}`}
          src={item.image}
          alt="Card cap"
        />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <div className="card-text">
            <p className={styles.description}>
              {showMore
                ? item.description
                : item.description.slice(0, 50) + "..."}
              <span
                className={styles.showMoreSpan}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? " Show less" : "Show more"}
              </span>
            </p>
            {/* 
          <a href="#" onClick={() => setShowMore(!showMore)}>
          {showMore ? " Show less" : "...Show more"}
        </a> */}
          </div>
          <p>
            <span className={styles.priceParagraph}>Price:</span> {item.price}$
          </p>
          <a href={`/product/${item.id}`} className="btn btn-primary">
            Buy
          </a>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
