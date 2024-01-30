import CategoriesShowcase from "../components/CategoriesShowcase";
import PageNav from "../components/PageNav";

import { Outlet, useParams } from "react-router-dom";

function Shop({ categories, items, itemsAmmount = 10, authentication }) {
  let { pageNumber } = useParams();

  const pagenumber = 1;

  return (
    <div>
      <PageNav authentication={authentication} key="ShopPageNav" />
      <CategoriesShowcase categories={categories} items={items} />
      <Outlet context={[pageNumber || pagenumber, itemsAmmount]} />
    </div>
  );
}

export default Shop;
