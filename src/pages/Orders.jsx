import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    fetch("http://localhost:4000/api/order/all", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errorMsg && typeof data === 'object') {
          setOrders(data);
        }
      });
  }, [token]);

  return (
    <div style={{ padding: 20 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Cliente</TableCell>
              <TableCell align="left">total (€)</TableCell>
              <TableCell align="left">Dirección</TableCell>
              <TableCell align="left">Ver detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left">{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell align="left">{order.name}</TableCell>
                <TableCell align="left">{order.total}</TableCell>
                <TableCell align="left">{order.address}</TableCell>
                <TableCell align="left">
                  <Button color="success" variant="contained">
                    <Link to={`/detail/${order._id}`}>Detalle</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
