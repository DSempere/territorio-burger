import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const OrderDetail = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const { token } = useSelector((state) => state.user);
  const { orderId } = useParams();

  const deleteOrder = () => {
    fetch(`http://localhost:4000/api/order/${orderId}`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/orders");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/api/order/${orderId}`, {
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errorMsg) {
          console.log(data);
          setOrder(data);
        }
      });
  }, [token, orderId]);
  return (
    <div style={{ padding: "20px" }}>
      <strong>Detalles del pedido:</strong>
      <p>Fecha: {new Date(order.date).toLocaleDateString() + " " + new Date(order.date).toLocaleTimeString()}</p>
      <p>Persona que lo realizó: {order.name}</p>
      <p>Dirección a la que se envió: {order.address}</p>
      <p>Total: {order.total}€</p>

      <div>Productos pedidos:</div>
      <lu>
        {order?.items?.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </lu>

      <Button onClick={deleteOrder} variant="contained" color="error" sx={{ marginTop: "30px", marginBottom: "10px" }}>
        Eliminar pedido
      </Button>
    </div>
  );
};
