import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ItemsList from "./components/ItemsList.js";
import Loading from "./components/Loading.js";
import PageNav from "./components/PageNav.js";
import ExploreCategory from "./pages/ExploreCategory.js";
import HomePage from "./pages/HomePage.js";
import ProductPage from "./pages/ProductPage.js";
import Register from "./pages/Register.js";
import Shop from "./pages/Shop.js";
import SignIn from "./pages/SignIn.js";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authentication, setAuthentication] = useState(false);
  const [refresh, setRefresh] = useState(false);

  let categories = [];

  function onRefresh() {
    setRefresh((refresh) => setRefresh(!refresh));
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:3000/api/products"); //get all the products
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/check-auth", {
          withCredentials: true,
        });
        console.log(response.data);
        setAuthentication(response.data);
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [refresh]);

  categories = [...new Set(items.map((item) => item.category))];

  return loading ? (
    <Loading />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage items={items} authentication={authentication} />}
          />

          <Route
            path="/explore"
            element={
              <Shop
                categories={categories}
                items={items}
                authentication={authentication}
              />
            }
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

          <Route
            path="/product/:id"
            element={<ProductPage authentication={authentication} />}
          />

          <Route
            path="register"
            element={
              <Register authentication={authentication} onRefresh={onRefresh} />
            }
          />

          <Route
            path="signin"
            element={
              <SignIn authentication={authentication} onRefresh={onRefresh} />
            }
          />

          <Route path="cart" />

          <Route path="*" element={<h1>Path doesn't exist :(</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
