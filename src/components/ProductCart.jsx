import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { changeQuantity } from "../redux/slices/cartSlice";

export const ProductCart = ({ product, showOptions = true }) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);
  const value = items.find((item) => item.id === product.id);

  const handleChangeQuantity = (e) => {
    const newQuantity = parseInt(e.target.value);
    dispatch(changeQuantity({ id: product.id, newQuantity: newQuantity }));
  };
  return (
    <Card sx={{ maxWidth: 345, marginTop: "10px" }}>
      <CardMedia component="img" height="140" image={product.image} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {product.price}€ x {product.quantity}: {product.quantity * product.price}€
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        {showOptions && (
          <select value={value.quantity} onChange={handleChangeQuantity}>
            <option value={0}>Eliminar del carrito</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            {product.quantity > 5 && <option value={product.quantity}>{product.quantity}</option>}
          </select>
        )}
      </CardActions>
    </Card>
  );
};
