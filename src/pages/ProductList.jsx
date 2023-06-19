import React, { useEffect, useState } from "react";
import { Product } from "../components/Product";
import Grid from "@mui/material/Grid";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/product/all", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.errorMsg) {
          setProducts(data);
        }
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {products.map((product) => (
          <Grid item xs={2} sm={4} md={4} key={product.id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
