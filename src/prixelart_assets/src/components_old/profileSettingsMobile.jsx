import React, { useState } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import service from "../pages_old/service";
import StorageIcon from "@mui/icons-material/Storage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import DialogConfirmDelete from "./dialogConfirmDelete";

function ProfileSettingsMobile({ open, setOpen }) {
  const [openSecurity, setOpenSecurity] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [typeDelete, setTypeDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const list = (
    <List>
      <List
        component="div"
        disablePadding
        style={{ backgroundColor: "rgb(0 0 0 / 5%)" }}
      >
        <ListItemButton
          sx={{ pl: 4 }}
          onClick={() => navigate("/settings/storage")}
        >
          <ListItemIcon>
            <StorageIcon style={{ color: "#FFFFFF" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "#FFFFFF" }} primary="Storage" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4 }}
          onClick={() => navigate("/settings/collections")}
        >
          <ListItemIcon>{/* <StorageIcon /> */}</ListItemIcon>
          <ListItemText style={{ color: "#FFFFFF" }} primary="NFTs" />
        </ListItemButton>
        <ListItemButton
          sx={{ pl: 4 }}
          onClick={() => setOpenSecurity(!openSecurity)}
        >
          <ListItemIcon>
            <VpnKeyIcon style={{ color: "#FFFFFF" }} />
          </ListItemIcon>
          <ListItemText style={{ color: "#FFFFFF" }} primary="Security" />
          {openSecurity ? (
            <ExpandLess style={{ color: "#FFFFFF" }} />
          ) : (
            <ExpandMore style={{ color: "#FFFFFF" }} />
          )}
        </ListItemButton>
        <Collapse in={openSecurity} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            style={{ backgroundColor: "rgb(0 0 0 / 12%)" }}
          >
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                setOpenDelete(true);
                setTypeDelete("profile");
              }}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText style={{ color: "red" }} primary="Delete profile" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* </Collapse> */}
    </List>
  );

  return (
    <>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={() => setOpen(false)}
        // onOpen={console.log}
        style={{
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            backgroundColor: "#2D2D2D",
            width: 240,
          },
        }}
      >
        {list}
      </SwipeableDrawer>

      <DialogConfirmDelete
        open={openDelete}
        setOpen={setOpenDelete}
        type={typeDelete}
        onDelete={async () => {
          setIsLoading(true);
          setOpenDelete(false);
          await service.deleteArtist();
          navigate("/login");
          setIsLoading(false);
        }}
      />
    </>
  );
}

export default ProfileSettingsMobile;

{
  /* <Collapse in={openSecurity} timeout="auto" unmountOnExit>
  <List
    component="div"
    disablePadding
    style={{ backgroundColor: "rgb(0 0 0 / 12%)" }}
  >
    <ListItemButton
      sx={{ pl: 4 }}
      onClick={() => {
        setOpenDelete(true);
        setTypeDelete("profile");
      }}
    >
      <ListItemIcon>
        {/* <VpnKeyIcon style={{ color: "#FFFFFF" }} /> 
      </ListItemIcon>
      <ListItemText style={{ color: "red" }} primary="Delete profile" />
    </ListItemButton>
  </List>
</Collapse>;
           */
}
