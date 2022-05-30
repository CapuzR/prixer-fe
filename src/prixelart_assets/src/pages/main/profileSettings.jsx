import React, { useState, useEffect } from "react";
import * as React from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StorageIcon from "@mui/icons-material/Storage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Collapse from "@mui/material/Collapse";
import DialogConfirmDelete from "../../components/dialogConfirmDelete";

function ProfileSettings() {
  const toolbarHeight = 68;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [typeDelete, setTypeDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight }}>
        {isLoading ? (
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box style={{ padding: 16, maxWidth: 1000, margin: "auto" }}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  style={{ position: "absolute" }}
                  color="primary"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBackIcon fontSize="medium" />
                </IconButton>
                <Typography
                  variant="h6"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Settings
                </Typography>
              </Box>
            </Box>
            <Box style={{ padding: 16, maxWidth: 1000, margin: "auto" }}>
              <List
                sx={{ width: "100%", bgcolor: "background.paper" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton disabled>
                  <ListItemIcon>
                    <StorageIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Storage" />
                </ListItemButton>
                <ListItemButton disabled>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="NFts" />
                  {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <VpnKeyIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Security" />
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        setOpenDelete(true);
                        setTypeDelete("profile");
                      }}
                    >
                      <ListItemIcon>
                        {/* <DeleteIcon color="primary" /> */}
                      </ListItemIcon>
                      <ListItemText
                        primary="Delete profile"
                        style={{ color: "red" }}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Box>
          </>
        )}
      </Box>
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
    </div>
  );

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }
}

export default ProfileSettings;
