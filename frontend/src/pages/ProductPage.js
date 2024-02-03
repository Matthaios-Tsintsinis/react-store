import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddRating from "../components/AddRating.js";
import Loading from "../components/Loading.js";
import PageNav from "../components/PageNav.js";
import Reviews from "../components/Reviews.js";
// import RatingStars from "../components/RatingStars.js";

import axios from "axios";

import styles from "../components/ProductPage.module.css";

function ProductPage({ authentication }) {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function onRefresh() {
    setRefresh((refresh) => !refresh);
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:3000/api/products/" + id
        ); //get the product
        const result = await response.data;

        setItem(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, refresh]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <PageNav authentication={authentication} key="ProductPagePageNav" />

      <div className={styles.container}>
        <img src={item.image} className={styles.productImage} alt={item.name} />

        <div className={styles.info}>
          <h4 className={styles.productTitle}>{item.title}</h4>
          <hr></hr>
          <div className={styles.ratingContainer}>
            <span>
              ⭐️ {(Math.round(item.rating?.rate * 100) / 100).toFixed(2)}
            </span>
            <p>{item.rating?.count} Ratings</p>
          </div>
          <hr></hr>
          <h5 className={styles.price}>{item.price}$</h5>
          <hr />
          <p>{item.description}</p>
        </div>
        <div className={styles.buyCard}>
          <div className={styles.buyCardRow}>
            <p>Price:</p>
            <strong className={styles.price}> {item.price}$</strong>
          </div>
          <hr />
          <div className={styles.buyCardRow}>
            <p>Status:</p>
            <p
              className={
                item.available === 0 ? styles.soldout : styles.available
              }
            >
              {item.available === 0
                ? "Sold Out"
                : `${item.available} Available `}
            </p>
          </div>
          {item.available > 0 && (
            <div>
              <hr />
              <select name="quantity" id="quantity">
                {Array.from({ length: item.available }, (cur, index) => (
                  <option value={index} key={index}>
                    Qty: {index + 1}
                  </option>
                ))}
              </select>
              <hr />
              <button>Add To Cart</button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.outterReviewsContainer}>
        <div className={styles.reviewsContainer}>
          <h4>Reviews</h4>
          <hr />
        </div>
      </div>
      <AddRating
        item={item}
        authentication={authentication}
        triggerRefresh={onRefresh}
      />
      <Reviews
        item={item}
        authentication={authentication}
        triggerRefresh={onRefresh}
      />
    </div>
  );
}

export default ProductPage;
