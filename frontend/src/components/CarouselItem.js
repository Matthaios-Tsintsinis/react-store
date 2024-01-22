import { Link } from "react-router-dom";
import styles from "./ItemCarousel.module.css";

function CarouselItem({
  active,
  src,
  alt,
  screenTime,
  itemTitle,
  itemPrice,
  itemId,
  characters,
}) {
  return (
    <Link
      to={`/product/${itemId}`}
      className={`carousel-item ${active ? "active" : ""} `}
      data-bs-interval={screenTime}
    >
      <div>
        <img
          src={src}
          className={`d-block ${styles.carouselImage}`}
          alt={alt}
        />
      </div>

      <div className={styles.priceContainer}>
        <div className={styles.itemPrice}>
          <h6>
            {itemTitle?.length > characters
              ? itemTitle?.slice(0, 40) + "..."
              : itemTitle}
          </h6>
          <p>Price: {itemPrice}$</p>
        </div>
      </div>
    </Link>
  );
}

export default CarouselItem;
