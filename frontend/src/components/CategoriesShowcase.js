import styles from "./CategoriesShowcase.module.css";
import CategoryCard from "./CategoryCard";

function CategoriesShowcase({ categories, items, setItems, allItems }) {
  return (
    <div className={styles.categoriesContainer}>
      <div>
        <CategoryCard
          category="All items"
          items={items}
          setItems={setItems}
          allItems={allItems}
        />
      </div>
      {categories.map((category, index) => (
        <div key={index}>
          <CategoryCard
            category={category}
            items={items}
            setItems={setItems}
            allItems={allItems}
          />
        </div>
      ))}
    </div>
  );
}

export default CategoriesShowcase;
