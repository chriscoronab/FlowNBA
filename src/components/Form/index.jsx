import styles from "./form.module.css";
import { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import db from "../../../db/firebase-config";
import { collection, addDoc, Timestamp, writeBatch } from "firebase/firestore";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { styled } from "@mui/material/styles";
import SubmitButton from "../Buttons/SubmitButton";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

signInWithPopup(auth, provider)
  .then(result => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch(error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

const initialValues = ({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    cp: ""
});

const schema = Yup.object().shape({
    nombre: Yup
        .string()
        .required("Se debe ingresar un nombre")
        .min(2, "El nombre es demasiado corto")
        .max(20, "El nombre es demasiado largo"),
    apellido: Yup
        .string()
        .required("Se debe ingresar un apellido")
        .min(2, "El apellido es demasiado corto")
        .max(20, "El apellido es demasiado largo"),
    email: Yup
        .string()
        .required("Se debe ingresar un email")
        .email("Email inválido"),
    telefono: Yup
        .string()
        .required("Se debe ingresar un número celular")
        .min(10, "El número es demasiado corto")
        .max(10, "El número es demasiado largo"),
    direccion: Yup
        .string()
        .required("Se debe ingresar una dirección")
        .min(6, "La dirección es demasiado corta")
        .max(30, "La dirección es demasiado larga"),
    cp: Yup
        .string()
        .required("Se debe ingresar un codigo postal")
        .min(2, "El código postal es demasiado corto")
        .max(6, "El código postal es demasiado largo"),
});

const CssTextField = styled(TextField)({
    "& label": {
        color: "white"
    },
    "& label.Mui-focused": {
        color: "white"
    },
    "& .MuiOutlinedInput-root": {
        "& input": {
            color: "white"
        },
        "& fieldset": {
            borderColor: "rgb(14, 163, 59)"
        },
        "&:hover fieldset": {
            borderColor: "green"
        },
        "&.Mui-focused fieldset": {
            borderColor: "rgb(14, 163, 59)"
        }
    }
});

export default function Form({ setOrderId }) {
  const { cart, totalCompra, vaciarCarrito } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const handleSubmit = values => {
    signInWithPopup(auth, provider);
    const order = {
      buyer: values,
      item: cart,
      total: totalCompra(),
      date: Timestamp.fromDate(new Date())
    };
    const batch = writeBatch(db);
    const ordersRef = collection(db, "orders");
    setLoading(true);
    addDoc(ordersRef, order)
      .then(res => {
        batch.commit();
        setOrderId(res.id);
        vaciarCarrito();
      })
      .finally(() => {
        setLoading(false);
      })
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}>
        {formik => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <CssTextField
              fullWidth
              name="nombre"
              label="Nombre"
              type="text"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
              variant="outlined"
              style={{ marginBottom: 11 }}
              required />
            <CssTextField
              fullWidth
              name="apellido"
              label="Apellido"
              type="text"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              error={formik.touched.apellido && Boolean(formik.errors.apellido)}
              helperText={formik.touched.apellido && formik.errors.apellido}
              variant="outlined"
              style={{ marginBottom: 11 }}
              required />
            <CssTextField
              fullWidth
              name="email"
              label="Correo electrónico"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              style={{ marginBottom: 11 }}
              required />
            <CssTextField
              fullWidth
              name="telefono"
              label="Teléfono"
              type="tel"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
              helperText={formik.touched.telefono && formik.errors.telefono}
              variant="outlined"
              style={{ marginBottom: 11 }}
              required />
            <CssTextField
              fullWidth
              name="direccion"
              label="Dirección"
              type="text"
              value={formik.values.direccion}
              onChange={formik.handleChange}
              error={formik.touched.direccion && Boolean(formik.errors.direccion)}
              helperText={formik.touched.direccion && formik.errors.direccion}
              variant="outlined"
              style={{ marginBottom: 11 }}
              required />
            <CssTextField
              fullWidth
              name="cp"
              label="Código Postal"
              type="number"
              value={formik.values.cp}
              onChange={formik.handleChange}
              error={formik.touched.cp && Boolean(formik.errors.cp)}
              helperText={formik.touched.cp && formik.errors.cp}
              variant="outlined"
              required />
            <div className={styles.submitButton}>
              <SubmitButton />
            </div>
          </form>
        )}
    </Formik>
  );
};