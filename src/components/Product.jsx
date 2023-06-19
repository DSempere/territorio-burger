import React from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addItem } from "../redux/slices/cartSlice";

export const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem({ item: product }));
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={product.image} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name} {product.price}€
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleAddItem} color="success" variant="contained" size="small">
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
};
