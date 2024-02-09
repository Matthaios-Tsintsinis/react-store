import CategoriesShowcase from "../components/CategoriesShowcase";

import { Outlet, useParams } from "react-router-dom";

function Shop({ categories, items, itemsAmmount = 10 }) {
  let { pageNumber } = useParams();

  const pagenumber = 1;

  return (
    <div>
      <CategoriesShowcase categories={categories} items={items} />
      <Outlet context={[pageNumber || pagenumber, itemsAmmount]} />
    </div>
  );
}

export default Shop;
