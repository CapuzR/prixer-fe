import React, { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Fab, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ActionButton = ({ isMobile }) => {
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorElActionMenu, setAnchorElActionMenu] = useState(null);

  const navigate = useNavigate();

  return (
    <>
      <Fab
        color="primary"
        id="basic-button"
        aria-controls={openActionMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openActionMenu ? "true" : undefined}
        onClick={(event) => {
          setOpenActionMenu(!openActionMenu);
          setAnchorElActionMenu(event.currentTarget);
        }}
        style={{
          position: !isMobile && "fixed",
          bottom: !isMobile && 16,
          right: !isMobile && 16,
        }}
      >
        <AddIcon />
      </Fab>
      <Menu
        id="basic-menu"
        anchorEl={anchorElActionMenu}
        open={openActionMenu}
        onClose={() => {
          setAnchorElActionMenu();
          setOpenActionMenu(false);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorElActionMenu(null);
            setOpenActionMenu(false);
            navigate("/form/post");
          }}
        >
          Add post
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorElActionMenu(null);
            setOpenActionMenu(false);
            navigate("/form/service");
          }}
        >
          Add service
        </MenuItem>

        <MenuItem
          onClick={() => {
            setAnchorElActionMenu(null);
            setOpenActionMenu(false);
            navigate("/form/gallery");
          }}
        >
          Add gallery
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionButton;
