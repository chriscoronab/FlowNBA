import { useState, useEffect } from "react";
import db from "../../../db/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import ItemListFiltered from "../ItemListFiltered";
import Spinner from "../Spinner";

const ItemListFilteredContainer = ({ categoria }) => {
  const [items, setItems] = useState([]);
  const itemsRef = collection(db, "items");
  const [loading, setLoading] = useState(true);
  const getItems = async () => {
    const itemsCollection = await getDocs(itemsRef);
    const items = itemsCollection.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setItems(items);
    setLoading(false);
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      { loading ? <Spinner /> : <ItemListFiltered items={items} categoria={categoria} /> }
    </>
  );
};

export default ItemListFilteredContainer;