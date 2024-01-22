import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ItemsList from "./components/ItemsList.js";
import Loading from "./components/Loading.js";
import ExploreCategory from "./pages/ExploreCategory.js";
import HomePage from "./pages/HomePage.js";
import ProductPage from "./pages/ProductPage.js";
import Register from "./pages/Register.js";
import Shop from "./pages/Shop.js";
import SignIn from "./pages/SignIn.js";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  let categories = [];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/products"); //get all the products
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

  categories = [...new Set(items.map((item) => item.category))];

  return loading ? (
    <Loading />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage items={items} />} />

          <Route
            path="/explore"
            element={<Shop categories={categories} items={items} />}
          >
            <Route index element={<ItemsList items={items} />} />
            <Route
              path="page/:pageNumber"
              element={<ItemsList items={items} />}
            />

            <Route
              path="category/:category/page/:pageNumber"
              element={<ExploreCategory />}
            />
          </Route>

          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="register" element={<Register />} />

          <Route path="signin" element={<SignIn />} />

          <Route path="*" element={<h1>Path doesn't exist :(</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
