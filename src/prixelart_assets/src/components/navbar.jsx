import React from "react";
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import logo from "../assets/prixelart.png";

function Navbar({ toolbarHeight, onLogout, isAuth, isOpenSideMenu }) {
  return (
    <MuiAppBar
      position="fixed"
      style={{
        height: toolbarHeight,
        backgroundColor: isAuth && "transparent",
      }}
    >
      <Toolbar style={{ alignItems: "center", height: toolbarHeight }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: 128,
            display: isOpenSideMenu ? "none" : "",
            marginLeft: 72,
          }}
        />
        <IconButton
          style={{ color: "white", marginLeft: "auto" }}
          onClick={onLogout}
        >
          {!isAuth && <ExitToAppIcon style={{ color: "white" }} />}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}

export default Navbar;
