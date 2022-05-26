import React from "react";
import * as React from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";

function NavigationBar({
  openActionMenu,
  hanleOpenActionMenu,
  setAnchorElActionMenu,
  anchorElActionMenu,
  setOpenActionMenu,
  setIsCreateArt,
  setIsCrateGallery,
  navigate,
  params,
}) {
  const location = useLocation();
  return (
    <Paper
      elevation={5}
      style={{
        height: 60,
        backgroundColor: "#FFFFFF",
        width: "100%",
        bottom: 0,
        position: "fixed",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton
          onClick={() => navigate("/main")}
          style={{
            color: location.pathname === "/main" ? "#2D2D2D" : "#C5C5C5",
          }}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton color="primary">
          <Typography
            style={{
              fontSize: 32,

              fontWeight: "bold",
            }}
          >
            <IconButton disabled={true} color="primary">
              <StarIcon fontSize="large" />
            </IconButton>
          </Typography>
        </IconButton>
      </Box>
      <Box
        style={{
          width: "20%",
          textAlign: "center",
          marginTop: -45,
        }}
      >
        <Fab
          color="primary"
          id="basic-button"
          aria-controls={openActionMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openActionMenu ? "true" : undefined}
          onClick={hanleOpenActionMenu}
        >
          <AddIcon />
        </Fab>
        <Menu
          id="basic-menu"
          anchorEl={anchorElActionMenu}
          open={openActionMenu}
          onClose={() => {
            setOpenActionMenu(false);
            setAnchorElActionMenu(null);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setIsCreateArt(true);
              setAnchorElActionMenu(null);
              setOpenActionMenu(false);
              navigate("/addArt");
            }}
          >
            Add post
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsCrateGallery(true);
              setAnchorElActionMenu(null);
              setOpenActionMenu(false);
              navigate("/addGallery");
            }}
          >
            Add gallery
          </MenuItem>
        </Menu>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton
          color="primary"
          onClick={() => navigate("/explore")}
          style={{
            color: location.pathname === "/explore" ? "#2D2D2D" : "#C5C5C5",
          }}
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton
          style={{
            color:
              location.pathname.split("/")[1] === "u" ? "#2D2D2D" : "#C5C5C5",
          }}
          color="primary"
          onClick={() => {
            if (params === localStorage.getItem("username")) {
              return false;
            } else {
              navigate(`/u/${localStorage.getItem("username")}`);
            }
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default NavigationBar;
