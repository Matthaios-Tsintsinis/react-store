import axios from "axios";
import { useState } from "react";

function AdjustQuantity({ quantity, order, authentication, onSetQuantity }) {
  function onChangeQuantity(e) {
    const newQuantity = Number(e.target.value);
    onSetQuantity(Number(e.target.value));

    if (authentication.authenticated) {
      axios
        .post("https://localhost:3000/api/changeCartItemQuantity", {
          user: authentication.user,
          product: order.productSchema,
          quantity: newQuantity,
        })
        .catch((error) => {
          console.log("Error:", error.message);
          console.log("Response:", error.response); // Log the response for more details
        });
    } else {
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      cart = cart.map((currentOrder) =>
        currentOrder.productSchema?._id === order.productSchema._id
          ? { ...order, quantity: newQuantity }
          : currentOrder
      );

      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  return (
    <select value={quantity} onChange={(e) => onChangeQuantity(e)}>
      {Array.from({ length: order.productSchema.available }, (cur, index) => (
        <option value={index + 1} key={index}>
          {index + 1}
        </option>
      ))}
    </select>
  );
}

export default AdjustQuantity;
