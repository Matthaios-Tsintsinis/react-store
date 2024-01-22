import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExploreItemRow from "../components/ExploreItemRow";
import Loading from "../components/Loading";

function ExploreCategory() {
  const itemsAmmount = 5;

  const { category } = useParams();

  let { pageNumber } = useParams();
  const defaultPageNumber = 1;
  const pageNum = pageNumber || defaultPageNumber;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    setCurPage(0);
  }, [category]);

  const navigate = useNavigate();

  const start = (pageNum - 1) * itemsAmmount;
  const end = pageNum * itemsAmmount;

  const totalPages = Math.ceil(items.length / itemsAmmount);

  function handleChange(e) {
    setCurPage((curPage) => e.target.value);

    navigate(
      `/explore/category/${category}/page/${Number(e.target.value) + 1}`
    );
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/category/${category}`
        ); //get all the products
        const result = await response.data;

        setItems(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      {items.slice(start, end).map((item, index) => (
        <ExploreItemRow item={item} key={item.id} />
      ))}

      {items.length > itemsAmmount && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            gap: "0.5rem",
          }}
        >
          <p>Page:</p>
          <select value={curPage} onChange={(e) => handleChange(e)}>
            {Array.from({ length: totalPages }, (currentValue, index) => (
              <option value={index} key={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default ExploreCategory;
