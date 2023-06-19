import React from "react";
import { useSelector } from "react-redux";
import { ProductCart } from "../components/ProductCart";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const Cart = () => {
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { username } = useSelector((state) => state.user);

  const moveToLogout = () => {
    navigate("/checkout");
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        <Grid item xs={3}>
          {items.map((product) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        <strong>El precio total es: {total}€</strong>
        <div style={{ marginTop: "20px" }}>
          {items.length > 0 && username && (
            <Button variant="contained" onClick={moveToLogout}>
              Realizar pedido
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
