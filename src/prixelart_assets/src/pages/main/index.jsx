import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import MuiAlert from "@mui/material/Alert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

import CircularProgress from "@mui/material/CircularProgress";

import service from "../service";
import consts from "../../consts/index";
import Navbar from "../../components/navbar";
import NavigationBar from "../../components/navigationBar";
import Sidebar from "../../components/sidebar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Main({ window }) {
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
  const [posts, setPosts] = useState();
  const [detailsPost, setDetailsPost] = useState();
  const [unfollowLoading, SetUnfollowLoading] = useState(false);
  const [isOpenSideMenu, setIsOpenSideManu] = useState(false);

  const drawerwidth = isOpenSideMenu ? 240 : 80;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    async function init() {
      if (!localStorage.getItem("wallet")) navigate("/login");
      setIsLoading(true);
      await Promise.all([service.readPostByFollowers()])
        .then(([posts]) => {
          setPosts(posts.ok);
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
      <Sidebar
        drawerwidth={drawerwidth}
        handleDrawerToggle={handleDrawerToggle}
        container={container}
        isOpenSideMenu={isOpenSideMenu}
      />
      <Box style={{ paddingTop: toolbarHeight, paddingBottom: 80 }}>
        {!posts ? (
          <Box
            style={{ marginTop: 48, display: "flex", justifyContent: "center" }}
          >
            <CircularProgress />
          </Box>
        ) : posts.length === 0 ? (
          <Box
            style={{ marginTop: 48, display: "flex", justifyContent: "center" }}
          >
            No posts.
          </Box>
        ) : (
          posts.map((item, index) => (
            <>
              <Box
                style={{
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                  paddingRight: 12,

                  maxWidth: 1000,
                  margin: "auto",
                }}
              >
                <Avatar
                  style={{ marginRight: 12 }}
                  onClick={() => navigate(`/u/${item.artistUsername}`)}
                />
                <Box onClick={() => navigate(`/u/${item.artistUsername}`)}>
                  {item.artistUsername}
                </Box>
                <Box
                  style={{ marginLeft: "auto" }}
                  onClick={() => {
                    setDetailsPost(item);
                    setPostSelected(index + 1);
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={(event) => hanleOpenActionMenuPost(event)}
                    id={`basic-button-post-${index + 1}`}
                    aria-controls={
                      openActionMenuPost
                        ? `basic-menu-post${index + 1}`
                        : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openActionMenuPost ? "true" : undefined}
                  >
                    {unfollowLoading && detailsPost?.postId === item.postId ? (
                      <CircularProgress size={32} />
                    ) : (
                      <MoreHorizIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Box
                style={{
                  marginTop: 4,
                  marginBottom: 4,
                  maxWidth: 1000,
                  margin: "auto",
                }}
              >
                <img
                  onClick={() => navigate(`/post/${item.postId}`)}
                  src={service.getUrl(
                    consts.ASSET_CANISTER_ID_SOCIALS,
                    `${item.postId}`
                  )}
                  alt={index}
                  loading="lazy"
                  style={{
                    display: "block",
                    width: "100%",
                    maxHeight: 500,
                    objectFit: "contain",
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
                    maxWidth: 1000,
                    margin: "auto",
                  }}
                >
                  <IconButton
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => {
                      if (item.likedByCaller) {
                        service.removeLike(item.postId);
                      } else {
                        service.addLike(item.postId);
                      }
                      handleLikePost(item.postId);
                    }}
                  >
                    {item.likedByCaller ? (
                      <FavoriteIcon fontSize="small" />
                    ) : (
                      <FavoriteBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                  <div style={{ paddingTop: 3 }}>{parseInt(item.likesQty)}</div>
                  <CommentIcon
                    fontSize="small"
                    style={{ marginLeft: 12, paddingTop: 2 }}
                  />
                  <div style={{ paddingTop: 3, marginLeft: 6 }}>
                    {parseInt(
                      item.comments.length === 0 ? 0 : item.comments[0].length
                    )}
                  </div>
                </div>
              </Box>
            </>
          ))
        )}
        {postSelected && anchorElActionMenuPost !== null && (
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
              onClick={async () => {
                SetUnfollowLoading(true);
                await service.removeFollow(detailsPost.artistUsername);
                setPosts(
                  posts.filter(
                    (post) => post.artistUsername !== detailsPost.artistUsername
                  )
                );
                setPostSelected(undefined);
                setDetailsPost(undefined);
                setAnchorElActionMenuPost(null);
                setOpenActionMenuPost(false);
                SetUnfollowLoading(false);
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
                navigate("/addArt");
              }}
            >
              Create Art
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorElActionMenu(null);
                setOpenActionMenu(false);
                navigate("/addGallery");
              }}
            >
              Create Gallery
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );

  function handleDrawerToggle() {
    setIsOpenSideManu(!isOpenSideMenu);
  }

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }

  function hanleOpenActionMenu(event) {
    setOpenActionMenu(true);
    setAnchorElActionMenu(event.currentTarget);
  }

  function hanleOpenActionMenuPost(event) {
    setOpenActionMenuPost(true);
    setAnchorElActionMenuPost(event.currentTarget);
  }

  function handleLikePost(postId) {
    const _posts = [...posts];
    const currentPost = _posts.findIndex((post) => post.postId === postId);
    if (_posts[currentPost].likedByCaller) {
      _posts[currentPost].likesQty = parseInt(_posts[currentPost].likesQty) - 1;
    } else {
      _posts[currentPost].likesQty = parseInt(_posts[currentPost].likesQty) + 1;
    }
    _posts[currentPost].likedByCaller = !_posts[currentPost].likedByCaller;
    setPosts(_posts);
  }
}

export default Main;
