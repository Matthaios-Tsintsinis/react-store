import { Link } from "react-router-dom";
import styles from "./ItemCard.module.css";

import ShowMore from "./ShwMore.js";

function ItemCard({ item }) {
  const wordLimit = 50;

  return (
    <div className={styles.container}>
      <div className="card">
        <Link to={`/product/${item.id}`}>
          <img
            className={`card-img-top ${styles.image}`}
            src={item.image}
            alt="Card cap"
          />
        </Link>
        <div className="card-body">
          <Link to={`/product/${item.id}`} className="card-title">
            <h5>{item.title}</h5>
          </Link>
          <div className="card-text">
            <ShowMore
              wordLimit={wordLimit}
              text={item.description}
              className={styles.description}
            />

            {/* 
          <a href="#" onClick={() => setShowMore(!showMore)}>
          {showMore ? " Show less" : "...Show more"}
        </a> */}
          </div>
          <p>
            <span className={styles.priceParagraph}>{item.price}$ </span>
          </p>
          {/* <Link to={`/product/${item.id}`} className="btn btn-primary">
            Buy
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
