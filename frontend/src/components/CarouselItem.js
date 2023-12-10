import styles from "./ItemCarousel.module.css";

function CarouselItem({ src, alt, screenTime }) {
  return (
    <div className="carousel-item" data-bs-interval={screenTime}>
      <img src={src} className={`d-block ${styles.carouselImage}`} alt={alt} />
    </div>
  );
}

export default CarouselItem;
