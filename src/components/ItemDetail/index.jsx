import styles from "./itemdetail.module.css";
import { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Typography from "@mui/material/Typography";
import ItemAttributes from "../ItemAttributes";
import ItemQuantitySelector from "../ItemQuantitySelector";
import PurchaseButton from "../Buttons/PurchaseButton";
import KeepBuyingButton from "../Buttons/KeepBuyingButton";

const ItemDetail = ({ item }) => {
    const [quantity, setQuantity] = useState();
    const [talle, setTalle] = useState("M");
    const { addItem } = useContext(CartContext);
    const handlerSetTalle = (e) => {
        let opcion = e.target.value;
        setTalle(opcion);
    };
    function onAdd(count) {
        setQuantity(count);
    };
    function purchase(item, quantity) {
        const size = talle;
        addItem(item, quantity, size);
    };
    return (
        <div className={styles.container}>
            <img src={item.imagen} alt={item.nombre} className={styles.image} />
            <div className={styles.textContainer}>
                <Typography gutterBottom variant="h4" component="div" key={item.id}>
                    <b>{item.nombre}</b>
                </Typography>
                <p className={styles.text}>{item.descripcion}</p>
                <p className={styles.text}>Precio: $ {item.precio.toLocaleString()} </p>
                {!quantity && <ItemAttributes handlerSetTalle={handlerSetTalle} />}
                {quantity === undefined && <ItemQuantitySelector key={"agregarAlCarrito"} initial={1} onAdd={onAdd} />}
                {quantity >= 1 && <div>
                    <div className={styles.keepBuyingButton}>
                        <KeepBuyingButton  purchase={purchase} item={item} quantity={quantity} />
                    </div>
                    <div>
                        <PurchaseButton purchase={purchase} item={item} quantity={quantity} />
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default ItemDetail;