import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // fetch username password y nos devuelve el token y el username
    fetch("http://localhost:4000/api/user/login", {
    credentials: "include",
    method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setError("");
        if (data.errorMsg) {
          setError(data.errorMsg);
        } else {
          dispatch(setUser({ username, token: data.token }));
          navigate("/");
        }
      })
      .catch((e) => {
        setError("Ha ocurrido algún error, intentalo más tarde");
      });
  };

  return (
    <div>
      <h3>iniciar Sesión</h3>
      <div style={{ marginBottom: 10 }}>
        <div>
          <label>Nombre de usuario: </label>
          <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div>
          <label>Contraseña: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
      </div>
      <div style={{ color: "red" }}>{error}</div>
      <Button variant="contained" onClick={handleLogin} sx={{ marginBottom: 10, marginTop: 3 }}>
        Iniciar sesión
      </Button>
      <br></br>
      <Link to="/register">Si no tienes cuenta registrate</Link>
    </div>
  );
}

export default Login;
