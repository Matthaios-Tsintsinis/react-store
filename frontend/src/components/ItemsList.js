import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import ExploreItemRow from "./ExploreItemRow";

function ItemsList({ items }) {
  const [pageNumber, itemsAmmount] = useOutletContext();
  const [curPage, setCurPage] = useState(0);

  const navigate = useNavigate();

  const start = (pageNumber - 1) * itemsAmmount;
  const end = pageNumber * itemsAmmount;

  const totalPages = Math.ceil(items.length / itemsAmmount);

  function handleChange(e) {
    setCurPage((curPage) => e.target.value);

    navigate(`/explore/page/${Number(e.target.value) + 1}`);
  }

  return (
    <div>
      {items.slice(start, end).map((item, index) => (
        <ExploreItemRow item={item} key={item.id} />
      ))}
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
    </div>
  );
}

export default ItemsList;
