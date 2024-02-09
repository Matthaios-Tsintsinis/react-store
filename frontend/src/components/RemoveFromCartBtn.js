import axios from "axios";
import styles from "./RemoveFromCartBtn.module.css";

function RemoveFromCartBtn({
  order,
  authentication,
  onSetTotalPrices,
  onRefreshCart,
}) {
  async function removeFromCart(order) {
    if (authentication.authenticated) {
      await axios
        .delete("/api/removeFromCart", { data: { order, authentication } })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error.message));
    } else {
      // Remove the order from the cart in sessionStorage
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      const updatedCart = cart.filter(
        (item) => item.productSchema._id !== order.productSchema._id
      );
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    onSetTotalPrices((prevTotalPrices) => {
      const index = prevTotalPrices.findIndex(
        (item) => item.order.productSchema._id === order.productSchema._id
      );

      if (index !== -1) {
        // If the order already exists in totalPrices, remove it
        return prevTotalPrices.filter((item, i) => i !== index);
      } else {
        // If the order doesn't exist in totalPrices, do nothing
        return prevTotalPrices;
      }
    });

    onRefreshCart();
  }

  return (
    <button
      className={styles.removeItemButton}
      onClick={() => removeFromCart(order)}
    >
      X
    </button>
  );
}

export default RemoveFromCartBtn;
