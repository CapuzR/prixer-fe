import React, { useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import logo from "../assets/prixelart.png";

import consts from "../consts/index";
import service from "../pages/service";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/Storage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Typography } from "@mui/material";

import service from "../pages/service";
import DialogConfirmDelete from "./dialogConfirmDelete";

function Sidebar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openSecurity, setOpenSecurity] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [typeDelete, setTypeDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!props.isOpenSideMenu) {
      setOpen(false);
      setOpenSecurity(false);
    }
  }, [props.isOpenSideMenu]);

  const drawer = (
    <div style={{ width: "auto", textAlign: "center", marginTop: "15px" }}>
      <div style={{ marginBottom: "74px", marginTop: "12px" }}>
        {props.isOpenSideMenu ? (
          <div
            style={{
              display: "flex",
              //   alignItems: "center",
              marginLeft: "24px",
            }}
          >
            <div>
              <img src={logo} style={{ width: 150 }} alt="logo" />
            </div>
            <div style={{ marginLeft: "auto", marginRight: "8px" }}>
              <IconButton onClick={props.handleDrawerToggle}>
                <ChevronLeftIcon style={{ color: "#FFFFFF" }} />
              </IconButton>
            </div>
          </div>
        ) : (
          <IconButton
            style={{ color: "white", marginTop: -15 }}
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        )}
      </div>
      {props.isOpenSideMenu ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
              marginTop: "24px",
            }}
          >
            <Avatar
              style={{ width: 100, height: 100 }}
              src={service.getUrl(
                consts.ASSET_CANISTER_ID_ARTIST,
                `A${JSON.parse(localStorage.getItem("_scApp"))?.principal}`
              )}
            ></Avatar>
          </div>
          <div style={{ color: "#FFFFFF", overflowWrap: "break-word" }}>
            <Typography variant="h6">{`${localStorage.getItem(
              "fullname"
            )}`}</Typography>
          </div>
          <div
            style={{
              marginBottom: "8px",
              color: "#FFFFFF",
              overflowWrap: "break-word",
            }}
          ></div>
          <div
            style={{
              marginTop: 16,
              padding: 4,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <p style={{ wordBreak: "break-word", color: "#FFFFFF" }}>
              {/* <strong>Grupos:</strong>
              {` ${filterGroups?.map((item) => ` ${item.name}`)} `} */}
            </p>
          </div>
          <div style={{ padding: 4, paddingTop: 0 }}>
            <p style={{ wordBreak: "break-word", color: "#FFFFFF" }}>
              {/* <strong>Habilidades:</strong>
              {` ${filterAbilities?.map((item) => ` ${item.name}`)} `} */}
            </p>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <IconButton onClick={props.handleDrawerToggle}>
            <Avatar
              src={service.getUrl(
                consts.ASSET_CANISTER_ID_ARTIST,
                `A${JSON.parse(localStorage.getItem("_scApp"))?.principal}`
              )}
              style={{ width: 50, height: 50 }}
            />
          </IconButton>
        </div>
      )}
      <Divider
        style={{
          color: "white",
          backgroundColor: "white",
          marginBottom: "24px",
        }}
      />
      {props.isOpenSideMenu ? (
        <>
          <List style={{ width: "90%" }}>
            <ListItem disablePadding style={{ marginBottom: "8px" }}>
              <ListItemButton
                onClick={() =>
                  location.pathname === "/main"
                    ? console.log("")
                    : navigate("/main")
                }
                style={{
                  backgroundColor:
                    location.pathname === "/main" ? "rgb(33 32 37)" : "",

                  borderRadius: "0px 20px 20px 0px",
                }}
              >
                <ListItemIcon>
                  <HomeIcon style={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText style={{ color: "#FFFFFF" }} primary="Feed" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding style={{ marginBottom: "8px" }}>
              <ListItemButton
                style={{
                  backgroundColor:
                    location.pathname === "/explore" ? "rgb(33 32 37)" : "",
                  borderRadius: "0px 20px 20px 0px",
                }}
                onClick={() =>
                  location.pathname === "/explore"
                    ? console.log("")
                    : navigate("/explore")
                }
              >
                <ListItemIcon>
                  <SearchIcon style={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText style={{ color: "#FFFFFF" }} primary="Explore" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding style={{ marginBottom: "8px" }}>
              <ListItemButton
                style={{
                  backgroundColor:
                    location.pathname.split("/")[1] === "u"
                      ? "rgb(33 32 37)"
                      : "",
                  borderRadius: "0px 20px 20px 0px",
                }}
                onClick={() =>
                  location.pathname.split("/")[1] === "u"
                    ? console.log()
                    : navigate(`/u/${localStorage.getItem("username")}`)
                }
              >
                <ListItemIcon>
                  <AccountCircleIcon style={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText style={{ color: "#FFFFFF" }} primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
          <List
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
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
                  <ListItemText
                    style={{ color: "#FFFFFF" }}
                    primary="Storage"
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate("/settings/collections")}
                >
                  <ListItemIcon>{/* <StorageIcon /> */}</ListItemIcon>
                  <ListItemText style={{ color: "#FFFFFF" }} primary="NFTs" />
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
                      <ListItemIcon>
                        {/* <VpnKeyIcon style={{ color: "#FFFFFF" }} /> */}{" "}
                      </ListItemIcon>
                      <ListItemText
                        style={{ color: "red" }}
                        primary="Delete profile"
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => setOpenSecurity(!openSecurity)}
                >
                  <ListItemIcon>
                    <VpnKeyIcon style={{ color: "#FFFFFF" }} />
                  </ListItemIcon>
                  <ListItemText
                    style={{ color: "#FFFFFF" }}
                    primary="Security"
                  />
                  {!openSecurity ? (
                    <ExpandLess style={{ color: "#FFFFFF" }} />
                  ) : (
                    <ExpandMore style={{ color: "#FFFFFF" }} />
                  )}
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding style={{ marginBottom: "8px" }}>
              <ListItemButton
                // style={{
                //   backgroundColor:
                //     location.pathname.split("/")[1] === "u"
                //       ? "rgb(33 32 37)"
                //       : "",
                //   borderRadius: "0px 20px 20px 0px",
                // }}
                onClick={() => setOpen(!open)}
              >
                <ListItemIcon>
                  <SettingsIcon style={{ color: "#FFFFFF" }} />
                </ListItemIcon>
                <ListItemText style={{ color: "#FFFFFF" }} primary="Settings" />
                {!open ? (
                  <ExpandLess style={{ color: "#FFFFFF" }} />
                ) : (
                  <ExpandMore style={{ color: "#FFFFFF" }} />
                )}
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <>
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <>
              <div>
                <IconButton
                  style={{
                    backgroundColor:
                      location.pathname === "/main" ? "rgb(33 32 37)" : "",

                    color: "white",
                  }}
                  onClick={() =>
                    location.pathname === "/main"
                      ? console.log("")
                      : navigate("/main")
                  }
                >
                  <HomeIcon fontSize="large" />
                  {/* <img
                    src={props.page === "chat" ? iconAgent : iconAgentDisable}
                    style={{ width: "32px" }}
                    alt="agente"
                  /> */}
                </IconButton>
              </div>
              <div
                style={{
                  marginTop: "30px",
                }}
              >
                <IconButton
                  style={{
                    backgroundColor:
                      location.pathname === "/explore" ? "rgb(33 32 37)" : "",

                    color: "white",
                  }}
                  onClick={() =>
                    location.pathname === "/explore"
                      ? console.log("")
                      : navigate("/explore")
                  }
                >
                  <SearchIcon fontSize="large" />
                </IconButton>
              </div>
              <div
                style={{
                  marginTop: "30px",
                }}
              >
                <IconButton
                  style={{
                    backgroundColor:
                      location.pathname.split("/")[1] === "u"
                        ? "rgb(33 32 37)"
                        : "",

                    color: "white",
                  }}
                  onClick={() =>
                    location.pathname.split("/")[1] === "u"
                      ? console.log()
                      : navigate(`/u/${localStorage.getItem("username")}`)
                  }
                >
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                }}
              >
                <IconButton
                  style={{
                    color: "white",
                  }}
                  onClick={() => {
                    props.setIsOpenSideManu(true);
                    setOpen(true);
                  }}
                >
                  <SettingsIcon fontSize="large" />
                </IconButton>
              </div>
            </>
          </div>
        </>
      )}

      <div
        style={{
          color: "white",
          bottom: "15px",
          width: "100%",
        }}
      >
        <div
          style={{
            marginTop: "30px",
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <>
      {props.isOpenSideMenu ? (
        <Drawer
          container={props.container}
          variant="temporary"
          open={props.isOpenSideMenu}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          style={{
            boxShadow:
              "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: props.drawerwidth,
              backgroundColor: "#2D2D2D",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          style={{
            boxShadow:
              "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
          }}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: props.drawerwidth,
              backgroundColor: "#2D2D2D",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
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

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
