import { useState } from "react";
import styles from "./itemquantityselector.module.css";
import AddItemButton from "../Buttons/AddItemButton";

export default function ItemQuantitySelector({ initial, onAdd }) {
  const [count, setCount] = useState(initial);
  function increment() {
    setCount(count + 1)
  };
  function decrement() {
    setCount(count - 1)
  };
  return (
    <>
      <div className={styles.itemCount}>
        <button className={styles.restButton} onClick={() => decrement()} disabled={count === initial} >-</button>
        <h3 className={styles.number}>{count}</h3>
        <button className={styles.addButton} onClick={() => increment()} >+</button>
      </div>
      <AddItemButton onAdd={onAdd} count={count} /> 
    </>
  );
};