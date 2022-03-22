import React from "react";
import * as React from "react";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddIcon from "@mui/icons-material/Add";

function ActionButton({
  openCreation,
  handleClickCreation,
  anchorElCreation,
  openCreation,
  setAnchorElCreation,
  setIsCreateArt,
  setIsCrateGallery,
}) {
  return (
    <>
      {/* <Fab
        color="primary"
        id="basic-button"
        aria-controls={openCreation ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openCreation ? "true" : undefined}
        onClick={handleClickCreation}
        style={{ position: "fixed", bottom: 16, right: 16 }}
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
      </Menu> */}
    </>
  );
}

export default ActionButton;
