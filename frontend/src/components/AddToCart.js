import axios from "axios";

function AddToCart({ authentication, item, quantity }) {
  function addToTheCart(item, authentication, quantity, cart) {
    if (authentication.authenticated) {
      axios
        .post("https://localhost:3000/api/addToCart", {
          user: authentication.user,
          product: item,
          quantity: quantity,
        })
        .catch((error) => {
          console.log("Error:", error.message);
          console.log("Response:", error.response); // Log the response for more details
        });
    } else {
      const alreadyInCart = cart.find(
        (order) => order?.productSchema?._id === item._id
      );

      if (alreadyInCart) {
        if (alreadyInCart.quantity + quantity > item.available) {
          quantity = item.available - alreadyInCart.quantity;
        }

        cart = cart.map((order) =>
          order.productSchema?._id === item._id
            ? { ...order, quantity: order.quantity + quantity }
            : order
        );
      } else {
        cart.push({ productSchema: item, quantity: quantity });
      }

      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  function onAddToCart(item, authentication) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let quantityInCart = 0;

    if (authentication.authenticated) {
      axios
        .post("https://localhost:3000/api/getInCartQuantity", {
          item: item,
          user: authentication.user,
        })
        .then((res) => {
          quantityInCart = res.data.quantity;

          if (quantityInCart + quantity > item.available) {
            quantity = item.available - quantityInCart;
          }

          addToTheCart(item, authentication, quantity, cart);
        })
        .catch((err) => console.log(err.message));
    } else {
      addToTheCart(item, authentication, quantity, cart);
    }
  }

  return (
    <button onClick={() => onAddToCart(item, authentication)}>
      Add To Cart
    </button>
  );
}

export default AddToCart;
