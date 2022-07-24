import React, { useState } from "react";
import * as React from "react";
import { Box, Avatar, IconButton, Paper, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

import consts from "../consts/index";
import service from "../pages_old/service";

const ListFeed = ({
  posts = [],
  handleNavigation,
  addLike,
  removeLike,
  handleLikePost,
  showPostDetails,
}) => {
  const [postSelected, setPostSelected] = useState();
  const [anchorElActionMenu, setAnchorElActionMenu] = useState(null);

  return (
    <>
      {posts.length === 0 ? (
        <Box style={{ textAlign: "center" }}>No posts</Box>
      ) : (
        posts?.map((item, index) => (
          <Paper
            elevation={2}
            style={{ marginBottom: 24, borderRadois: 10 }}
            key={index}
          >
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
                src={service.getUrl(
                  consts.ASSET_CANISTER_ID_ARTIST,
                  `A${item.artistPrincipal}`
                )}
                style={{ marginRight: 12 }}
                onClick={() => handleNavigation(`${item.artistUsername}`)}
              />
              <Box onClick={() => handleNavigation(`${item.artistUsername}`)}>
                {item.artistUsername}
              </Box>
              <Box style={{ marginLeft: "auto" }}>
                <IconButton
                  color="primary"
                  onClick={(event) => {
                    setPostSelected(item.postId);
                    setAnchorElActionMenu(event.currentTarget);
                  }}
                  id={`basic-button-post-${item.postId}`}
                  aria-controls={
                    postSelected === item.postId
                      ? `basic-menu-post${item.postId}`
                      : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={
                    postSelected === item.postId ? "true" : undefined
                  }
                >
                  <MoreHorizIcon />
                </IconButton>
                {postSelected && anchorElActionMenu !== null && (
                  <Menu
                    id={`basic-button-post-${item.postId}`}
                    anchorEl={anchorElActionMenu}
                    open={postSelected === item.postId}
                    onClose={() => {
                      setAnchorElActionMenu(null);
                      setPostSelected(undefined);
                    }}
                    className="menuHistorial"
                    MenuListProps={{
                      "aria-labelledby": `basic-button-post-${item.postId}`,
                    }}
                  >
                    <MenuItem>Unfollow</MenuItem>
                  </Menu>
                )}
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
                onClick={() => showPostDetails(item.postId)}
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
                      removeLike(item.postId);
                    } else {
                      addLike(item.postId);
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
          </Paper>
        ))
      )}
    </>
  );
};

export default ListFeed;
