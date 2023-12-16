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
    <div
      className={`carousel-item ${active ? "active" : ""} `}
      data-bs-interval={screenTime}
    >
      <a href={`/product/${itemId}`}>
        <img
          src={src}
          className={`d-block ${styles.carouselImage}`}
          alt={alt}
        />{" "}
      </a>

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
    </div>
  );
}

export default CarouselItem;
