import ItemCarousel from "../components/ItemCarousel";
import PageNav from "../components/PageNav";

function HomePage({ items }) {
  return (
    <div>
      <PageNav />
      <ItemCarousel items={items} />
    </div>
  );
}

export default HomePage;
