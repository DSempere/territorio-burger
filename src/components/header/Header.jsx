import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { username } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeUser());
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={"products"}>Productos</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={"cart"}>Carrito</Link>
        </MenuItem>
        {username && (
          <MenuItem onClick={handleClose}>
            <Link to={"orders"}>Pedidos</Link>
          </MenuItem>
        )}
      </Menu>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={""}>Territorio Burger</Link>
            </Typography>
            {!username ? (
              <Link to={"login"}>Login</Link>
            ) : (
              <Link to={""} onClick={handleLogout}>
                Logout
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
