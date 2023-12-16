import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading.js";
import PageNav from "../components/PageNav.js";
import RatingStars from "../components/RatingStars.js";

import axios from "axios";

import styles from "../components/ProductPage.module.css";

function ProductPage() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://fakestoreapi.com/products/" + id
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
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <PageNav />

      <div className={styles.container}>
        <img src={item.image} className={styles.productImage} alt={item.name} />

        <div className={styles.info}>
          <h4 className={styles.productTitle}>{item.title}</h4>
          <hr></hr>
          <div>
            <RatingStars
              size={24}
              messages={["Really Bad", "Bad", "Average", "Good", "Excellent"]}
              onSetRating={() => console.log("nice")}
            />
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
            <p className={styles.soldout}>Sold Out</p>
          </div>
          <hr />
          <select name="quantity" id="quantity">
            {Array.from({ length: 30 }, (cur, index) => (
              <option value={index} key={index}>
                Qty: {index}
              </option>
            ))}
          </select>
          <hr />
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
