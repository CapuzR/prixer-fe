import React from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import HomeIcon from "@mui/icons-material/Home";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";

function NavigationBar({
  openCreation,
  handleClickCreation,
  setAnchorElCreation,
  anchorElCreation,
  setIsCreateArt,
  setIsCrateGallery,
}) {
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
        // padding: 16,
      }}
    >
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton color="primary">
          <HomeIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton
          color="primary"
          // onClick={() => setShowPrixerList(true)}
        >
          <Typography
            style={{
              fontSize: 32,

              fontWeight: "bold",
            }}
          >
            P
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
          aria-controls={openCreation ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openCreation ? "true" : undefined}
          onClick={handleClickCreation}
        >
          <AddIcon />
        </Fab>
        <Menu
          id="basic-menu"
          anchorEl={anchorElCreation}
          open={openCreation}
          onClose={() => setAnchorElCreation(null)}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setIsCreateArt(true);
              setAnchorElCreation(null);
            }}
          >
            Create Art
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsCrateGallery(true);
              setAnchorElCreation(null);
            }}
          >
            Create Gallery
          </MenuItem>
        </Menu>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton color="primary">
          <LocalFireDepartmentIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton color="primary">
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default NavigationBar;
