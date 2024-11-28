import styles from "./itemlistfiltered.module.css";
import Card from "../Card";

const ItemListFiltered = ({ items, categoria }) => {
  return (
    <div className={styles.itemlist}>
      {items.map((item, id) =>
        (item.categoria==categoria && <Card key={id} item={item} />)
      )}
    </div>
  );
};

export default ItemListFiltered;