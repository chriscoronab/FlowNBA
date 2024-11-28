import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail";
import db from "../../../db/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../Spinner";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const getItem = async () => {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setItem(docSnap.data());
      setLoading(false);
    } else {
      document.body.innerHTML = "<h1>Producto no encontrado</h1>"
    };
  };
  useEffect(() => {
    getItem();
  }, []);
  return (
    <>
      { loading ? <Spinner /> : <ItemDetail item={item} /> }
    </>
  );
};

export default ItemDetailContainer;