import { useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";

import CartItem from "./CartItem";
import Loading from "./Loading";

import axios from "axios";

function Cart({ className, onCloseCart, authentication, cartIsOpen }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrices, setTotalPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refreshCart, setRefreshCart] = useState(false);

  function onRefreshCart() {
    setRefreshCart((lastValue) => !lastValue);
  }

  useEffect(() => {
    setTotalPrice(
      totalPrices.length > 0
        ? totalPrices.reduce(
            (sum, order) =>
              sum +
              Math.round(
                order.order.quantity * order.order.productSchema.price * 100
              ) /
                100,
            0
          )
        : 0
    );
  }, [totalPrices]);

  useEffect(() => {
    if (cartIsOpen) {
      async function getCartContent() {
        if (authentication.authenticated) {
          try {
            setLoading(true);
            const response = await axios.post(
              "https://localhost:3000/api/getCart",
              {
                user: authentication?.user?._id,
              }
            );
            setCart(response.data);
          } catch (error) {
            console.log("Error:", error.message);
            console.log("Response:", error.response);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(true);
          const storedCart = await JSON.parse(sessionStorage.getItem("cart"));
          setCart(storedCart);
          setLoading(false);
        }
      }

      getCartContent();
    }
  }, [authentication, refreshCart, cartIsOpen]);

  return (
    <div className={`${styles.cartSidepanel} ${className}`}>
      <div className={styles.topPanel}>
        <button className={styles.closeCartButton} onClick={onCloseCart}>
          X
        </button>
        <img
          src={require("../public/shopping-cart-white.png")}
          alt="shopping cart"
          className="shoppingCart"
        />
        <h5>Your Shopping Cart</h5>
      </div>
      <div className={styles.cartProducts}>
        {loading ? (
          <Loading />
        ) : cart.length > 0 ? (
          cart.map((order) => (
            <CartItem
              order={order}
              authentication={authentication}
              onSetTotalPrices={setTotalPrices}
              onRefreshCart={onRefreshCart}
              key={order._id}
            />
          ))
        ) : (
          <div className={styles.noItemsMsgContainer}>
            <h3 className={styles.noItemsMsg}>Your cart is empty</h3>
          </div>
        )}
      </div>
      <div className={styles.totalPay}>
        {" "}
        <span className={styles.totalPayTitle}>Total:</span>{" "}
        <span className={styles.totalPayNumber}>{totalPrice}$</span>
      </div>
      <div className={styles.bottomPanel}>
        <button className={styles.checkoutButton}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
