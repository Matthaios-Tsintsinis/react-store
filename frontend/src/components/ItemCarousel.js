import { useEffect, useState } from "react";

import CarouselItem from "./CarouselItem";

import styles from "./ItemCarousel.module.css";

function ItemCarousel({ items }) {
  const [itemsShowcase, setItemsShowcase] = useState([]);

  const itemsNumber = 3;

  useEffect(() => {
    let randomItems = [];
    let randomNumber;

    if (items.length !== 0) {
      for (let i = 0; i < itemsNumber; i++) {
        randomNumber = Math.floor(Math.random() * items.length);

        while (randomItems?.includes(items[randomNumber])) {
          randomNumber = Math.floor(Math.random() * items.length);
        }

        randomItems.push(items[randomNumber]);
      }
    }

    setItemsShowcase(randomItems);
  }, [items, itemsNumber]);

  useEffect(() => {
    document.getElementsByClassName("carousel-control-next")[0].click();
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img
              src={itemsShowcase[0]?.image}
              className={`d-block ${styles.carouselImage}`}
              alt="..."
            />
          </div>

          {itemsShowcase
            .filter((_, i) => i !== 0)
            .map((item, i) => (
              <CarouselItem
                src={item.image}
                alt={item.description}
                screenTime="3000"
                key={i}
              />
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default ItemCarousel;
