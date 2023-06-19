import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { ProductCart } from "../components/ProductCart";
import { useState } from "react";
import { cleanCart } from "../redux/slices/cartSlice";
import { Button } from "@mui/material";

export const Checkout = () => {
  const { items, total } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("card");

  const [enableFinish, setEnableFinish] = useState(false);
  const [orderFinished, setOrderFinished] = useState(false);
  const [orderError, setOrderError] = useState();

  useEffect(() => {
    if (name && surname && address && method) {
      setEnableFinish(true);
    } else {
      setEnableFinish(false);
    }
  }, [name, surname, address, method]);

  const handleCheckout = (e) => {
    e.preventDefault();
    // hago peticion al backend con el pedido
    fetch("http://localhost:4000/api/order/new", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ name: name + " " + surname, address, total, items }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errorMsg) {
          dispatch(cleanCart());
          // Muestro mensaje de tu pedido esta en camino
        } else {
          setOrderError("Ha habido un error procesando tu pedido. Inténtalo más tarde.");
          // muestro mensaje de que no se ha podido procesar tu pedido
        }
      })
      .catch((e) => {
        setOrderError("Ha habido un error procesando tu pedido. Inténtalo más tarde.");
      });
    setOrderFinished(true);
  };
  return (
    <div>
      {orderFinished ? (
        orderError ? (
          orderError
        ) : (
          <div
            style={{
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: "30px",
            }}
          >
            Tu pedido ha sido procesado correctamente, pronto llegará a casa el repartidor.
          </div>
        )
      ) : (
        <>
          <div style={{ padding: 20 }}>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
              <Grid item xs={3}>
                {items.map((product) => (
                  <ProductCart showOptions={false} key={product.id} product={product} />
                ))}
              </Grid>
            </Grid>
            <div style={{ marginTop: 20 }}>
              <strong>El precio total es: {total}€</strong>
              <div style={{ marginTop: "20px" }}></div>
            </div>
          </div>
          <form onSubmit={handleCheckout}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
            <br />
            <input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Apellidos" />
            <br />
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección" />
            <br />
            <label>Metodo de pago</label>
            <br></br>
            <select onChange={(e) => setMethod(e.target.value)} value={method}>
              <option value="efectivo">Efectivo</option>
              <option value="card">Tarjeta</option>
              <option value="bizum">Bizum</option>
            </select>
            <br></br>
            <div style={{ marginTop: "20px", marginBottom: "20px", fontWeight: 500 }}>
              {items.length > 0 && name && surname && address && method ? (
                <Button disa disabled={!enableFinish} color="success" variant="contained" type="submit">
                  Finalizar compra
                </Button>
              ) : (
                "Debes rellenar todos los campos para finalizar la compra."
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};
