import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./components/Loading.js";
import HomePage from "./pages/HomePage.js";
import ProductPage from "./pages/ProductPage.js";
import Shop from "./pages/Shop.js";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products"); //get all the products
        const result = await response.data;

        setItems(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage items={items} />} />
          <Route path="/explore" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="*" element={<h1>Path doesn't exist :(</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
