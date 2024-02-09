import { useEffect, useState } from "react";

import AdjustQuantity from "./AdjustQuantity";
import styles from "./CartItem.module.css";
import RemoveFromCartBtn from "./RemoveFromCartBtn";

function CartItem({ order, authentication, onSetTotalPrices, onRefreshCart }) {
  const [quantity, setQuantity] = useState(order.quantity);
  const [totalPrice, setTotalPrice] = useState(
    order.quantity * order.productSchema.price
  );

  useEffect(() => setQuantity(order.quantity), [order.quantity]);

  useEffect(() => {
    const newTotalPrice = (
      Math.round(quantity * order.productSchema.price * 100) / 100
    ).toFixed(2);

    setTotalPrice(newTotalPrice);

    onSetTotalPrices((prevTotalPrices) => {
      const index = prevTotalPrices.findIndex(
        (item) => item.order.productSchema._id === order.productSchema._id
      );

      if (index !== -1) {
        // If the order already exists in totalPrices, update its quantity and price
        return prevTotalPrices.map((item, i) =>
          i === index
            ? {
                ...item,
                order: {
                  ...item.order,
                  quantity: quantity,
                  productSchema: {
                    ...item.order.productSchema,
                    price: order.productSchema.price,
                  },
                },
              }
            : item
        );
      } else {
        // If the order doesn't exist in totalPrices, add a new object
        return [...prevTotalPrices, { order: order }];
      }
    });
  }, [
    order.quantity,
    quantity,
    order.productSchema.price,
    order,
    onSetTotalPrices,
  ]);

  function onSetQuantity(quantity) {
    setQuantity(quantity);
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <img src={order.productSchema.image} className={styles.cardImage} />

        <p className={styles.cardTitle}>{order.productSchema.title}</p>
        <RemoveFromCartBtn
          order={order}
          authentication={authentication}
          onSetTotalPrices={onSetTotalPrices}
          onRefreshCart={onRefreshCart}
        />
      </div>
      <div className={styles.attributes}>
        <p className={styles.priceOriginal}>
          <span className={styles.attributeTitle}>Price:</span>
          <span>{order.productSchema.price}$</span>
        </p>
        <p>
          <span className={styles.attributeTitle}>Qty:</span>
          <AdjustQuantity
            quantity={quantity}
            order={order}
            authentication={authentication}
            onSetQuantity={onSetQuantity}
          />
        </p>

        <p>
          <span className={`${styles.attributeTitle}`}>Total Price:</span>
          <span>
            {/* {(
              Math.round(quantity * order.productSchema.price * 100) / 100
            ).toFixed(2)} */}
            {totalPrice}$
          </span>
        </p>
      </div>
    </div>
  );
}

export default CartItem;
