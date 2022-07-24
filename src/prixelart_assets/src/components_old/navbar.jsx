import React from "react";
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import logo from "../assets/prixelart.png";

function Navbar({ onLogout, isAuth, isOpenSideMenu, mobileBreakpoint }) {
  return (
    <MuiAppBar
      position="fixed"
      style={{
        height: 60,
        backgroundColor: isAuth && "transparent",
      }}
    >
      <Toolbar style={{ alignItems: "center", height: 60 }}>
        <img
          src={""}
          alt="logo"
          style={{
            width: 128,
            display: isOpenSideMenu ? "none" : "",
            marginLeft: mobileBreakpoint && 72,
          }}
        />
        {!isAuth && (
          <IconButton
            style={{ color: "white", marginLeft: "auto" }}
            onClick={onLogout}
          >
            <ExitToAppIcon style={{ color: "white" }} />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}

export default Navbar;
