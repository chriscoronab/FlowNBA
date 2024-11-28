import styles from "./checkout.module.css";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import ItemListButton from "../Buttons/ItemListButton";
import Form from "../Form";

const Checkout = () => {
  const { cart, totalCompra } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  return (
    <div className={styles.checkout}>
      { orderId ?
        <div className={styles.checkoutTitle}>
          <h2>Compra realizada con éxito</h2>
          <h3>Tu orden de compra es: <span className={styles.orderId}>{orderId}</span></h3>
          <div className={styles.itemListButton}>
            <ItemListButton text="Volver al inicio" />
          </div>
        </div>
      :
        <>
          <h2 className={styles.checkoutTitle}><b>Checkout</b></h2>
          <section>
            <h3>Resumen de la compra:</h3>
            <div>
              {cart.map((product, cantidad, talle) =>
                <p key={product.id}>- {product.descripcion} - Talle {product.talle} x {product.cantidad}</p>
              )}
              <p>Precio total: ${totalCompra().toLocaleString()}</p>
            </div>
          </section>
          <section className={styles.form}>
            <h3 className={styles.checkoutTitle}>Completa el formulario para finalizar la compra:</h3>
            <Form setOrderId={setOrderId} />
          </section>
        </>
      }
    </div>
  );
};

export default Checkout;