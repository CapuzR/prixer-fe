import React from "react";
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar({ toolbarHeight, onLogout, isAuth }) {
  return (
    <MuiAppBar
      position="fixed"
      style={{
        height: toolbarHeight,
        backgroundColor: isAuth && "transparent",
      }}
    >
      <Toolbar>
        <img src={""} alt="logo" />
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