import Cart from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import Login from "../pages/Login";
import Main from "../pages/Main";
import ProductList from "../pages/ProductList";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Orders from "../pages/Orders";
import { OrderDetail } from "../pages/OrderDetail";

function Router() {
  const { username } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {!username && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
      {username && (
        <>
          <Route path="/detail/:orderId" element={<OrderDetail />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </>
      )}
    </Routes>
  );
}

export default Router;
