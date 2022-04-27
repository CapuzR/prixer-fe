import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

import service from "../service";
import Navbar from "../../components/navbar";
import NavigationBar from "../../components/navigationBar";
const toolbarHeight = 68;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Main() {
  const navigate = useNavigate();
  const toolbarHeight = 68;
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  const [isLoading, setIsLoading] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(false);
  const [anchorElActionMenu, setAnchorElActionMenu] = useState(null);
  const [openActionMenuPost, setOpenActionMenuPost] = useState(false);
  const [anchorElActionMenuPost, setAnchorElActionMenuPost] = useState(null);
  const [postSelected, setPostSelected] = useState();
  const [artist, setArtist] = useState();

  useEffect(() => {
    async function init() {
      if (!localStorage.getItem("wallet")) navigate("/login");

      setIsLoading(true);
      await Promise.all([service.getArtist(), service.getPostsByCreation()])
        .then(([artist, posts]) => {
          const parseArtist = service.parseArtist(artist);
          setArtist(parseArtist);
          setIsLoading(false);
        })
        .catch((err) => setIsLoading(false));
    }
    init();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight, paddingBottom: 80 }}>
        {[
          {
            image:
              "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=162&auto=format",
            imageSet:
              "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=162&auto=format&dpr=2 2x",
          },
          {
            image:
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=162&auto=format",
            imageSet:
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=162&auto=format&dpr=2 2x",
          },
          {
            image:
              "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=162&auto=format",
            imageSet:
              "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?w=162&auto=format&dpr=2 2x",
          },
        ].map((item, index) => (
          <>
            <Box
              style={{
                height: 60,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              <Avatar style={{ marginRight: 12 }} />
              <Box>Gleiber Granado</Box>
              <Box
                style={{ marginLeft: "auto" }}
                onClick={() => setPostSelected(index)}
              >
                <IconButton
                  color="primary"
                  onClick={(event) => hanleOpenActionMenu(event)}
                  id={`basic-button-post-${index + 1}`}
                  aria-controls={
                    openActionMenuPost
                      ? `basic-menu-post${index + 1}`
                      : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openActionMenuPost ? "true" : undefined}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Box>
            <Box style={{ marginTop: 4, marginBottom: 4 }}>
              <img
                // onClick={() => navigate("/profile?image=" + index)}
                src={item.image}
                srcSet={item.imageSet}
                alt={index}
                loading="lazy"
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: 500,
                }}
              />
              <div
                style={{
                  backgroundColor: "#2D2D2D",
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <IconButton style={{ color: "white" }}>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton style={{ color: "white" }}>
                  <ModeCommentOutlinedIcon />
                </IconButton>
              </div>
            </Box>
          </>
        ))}
        {postSelected && anchorElActionMenuPost && (
          <Menu
            id={`basic-button-post-${postSelected}`}
            anchorEl={anchorElActionMenuPost}
            open={openActionMenuPost}
            onClose={() => {
              setAnchorElActionMenuPost(null);
              setOpenActionMenuPost(false);
              setPostSelected(undefined);
            }}
            className="menuHistorial"
            MenuListProps={{
              "aria-labelledby": `basic-button-post-${postSelected}`,
            }}
          >
            <MenuItem
              onClick={() => {
                setPostSelected(undefined);
                setAnchorElActionMenuPost(null);
                setOpenActionMenuPost(false);
              }}
            >
              Unfollow
            </MenuItem>
          </Menu>
        )}
      </Box>
      {!mobileBreakpoint ? (
        <NavigationBar
          openActionMenu={openActionMenu}
          setOpenActionMenu={setOpenActionMenu}
          hanleOpenActionMenu={hanleOpenActionMenu}
          setAnchorElActionMenu={setAnchorElActionMenu}
          anchorElActionMenu={anchorElActionMenu}
          navigate={navigate}
          artist={artist}
          setIsCreateArt={console.log}
          setIsCrateGallery={console.log}
        />
      ) : (
        <>
          <Fab
            color="primary"
            id="basic-button"
            aria-controls={openActionMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openActionMenu ? "true" : undefined}
            onClick={hanleOpenActionMenu}
            style={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <AddIcon />
          </Fab>
          <Menu
            id="basic-menu"
            anchorEl={anchorElActionMenu}
            open={openActionMenu}
            onClose={() => {
              setAnchorElActionMenu(null);
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
              }}
            >
              Create Art
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorElActionMenu(null);
                setOpenActionMenu(false);
              }}
            >
              Create Gallery
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }

  function hanleOpenActionMenu(event) {
    setOpenActionMenu(true);
    setAnchorElActionMenu(event.currentTarget);
  }

  function hanleOpenActionMenu(event) {
    setOpenActionMenuPost(true);
    setAnchorElActionMenuPost(event.currentTarget);
  }
}

export default Main;
