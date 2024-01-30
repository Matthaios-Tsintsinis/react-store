import ItemCarousel from "../components/ItemCarousel";
import ItemsShowcase from "../components/ItemsShowcase";
import PageNav from "../components/PageNav";

function HomePage({ items, authentication }) {
  return (
    <div>
      <PageNav authentication={authentication} key="HomePagePageNav" />
      <ItemCarousel items={items} />
      <ItemsShowcase items={items} type="latest" numOfItems={-5}>
        Latest Additions
      </ItemsShowcase>
      <ItemsShowcase items={items} type="bestReviews" numOfItems={5}>
        Highest Reviews
      </ItemsShowcase>
    </div>
  );
}

export default HomePage;
