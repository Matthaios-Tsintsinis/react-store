import ItemCard from "./ItemCard";

function ItemsShowcase({ items, type, numOfItems = null, children }) {
  let array = [];

  if (numOfItems === null) {
    array = items;
  } else if (numOfItems >= 0) {
    array = items.slice(0, numOfItems);
  } else {
    array = items.slice(Math.max(items.length - -numOfItems, 0));
  }

  if (type === "bestReviews") {
    array = items
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, numOfItems);
  }

  return (
    <div>
      <h2>{children}</h2>
      <div className="flex-container">
        {array?.map((item) => (
          <ItemCard item={item} key={item.id} />
          //   <div key={item.id}>
          //     <h3>{item.title}</h3>
          //     <img src={item.image} alt={item.title} />
          //     <p>{item.description}</p>
          //   </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsShowcase;
