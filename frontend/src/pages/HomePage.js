import ItemCarousel from "../components/ItemCarousel";
import ItemsShowcase from "../components/ItemsShowcase";

function HomePage({ items }) {
  return (
    <div>
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
