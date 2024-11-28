import styles from "./cartitem.module.css";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import RemoveCartItemButton from "../Buttons/RemoveCartItemButton";

const CartItem = ({ id, nombre, descripcion, precio, imagen, cantidad, talle }) => {
  const { removeItem } = useContext(CartContext);
  return (
    <Card sx={{ maxWidth: 345 }} className={styles.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          image={imagen}
          alt={nombre}
        />
        <CardContent>
          <Typography variant="body1" className={styles.descripcion}>
            {descripcion}
          </Typography>
          <Typography variant="body2">
            Talle: {talle}
          </Typography>
          <Typography variant="body2">
            Precio: $ {precio.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Cantidad: {cantidad}
          </Typography>
          <h3>Total: ${(precio * cantidad).toLocaleString()}</h3>
        </CardContent>
      </CardActionArea>
      <div className={styles.removeButton}>
        <RemoveCartItemButton removeItem={removeItem} id={id} talle={talle} cantidad={cantidad} />
      </div>
    </Card>    
  );
};

export default CartItem;