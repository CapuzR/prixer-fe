import React, { useState } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import EditIcon from "@mui/icons-material/Edit";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";

import service from "../pages/service";

function ArtDetail({
  post,
  navigate,
  mobileBreakpoint,
  setPost,
  setIsEditPost,
}) {
  const camera = post?.post?.postBasics?.details.find(
    (item) => item[0] === "camera"
  )[1].Vec[0].Text;
  const lens = post?.post?.postBasics?.details.find(
    (item) => item[0] === "lens"
  )[1].Vec[0].Text;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box>
      <Box style={{ padding: 16 }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">Post Detail</Typography>

          <IconButton
            color="primary"
            onClick={() => navigate(-1)}
            style={{ marginLeft: "auto" }}
          >
            <ArrowCircleLeftOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <img
        src={post?.post?.postBasics?.asset}
        srcSet={post?.post?.postBasics?.asset}
        alt={"image"}
        loading="lazy"
        style={{
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          display: "block",
          width: !mobileBreakpoint && "100%",
          margin: mobileBreakpoint && "auto",
          maxHeight: mobileBreakpoint && 650,
        }}
      />
      <Box style={{ padding: 16 }}>
        <Box style={{ display: "flex" }}>
          <Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">
                {post?.post?.postBasics?.title}
              </Typography>
              <IconButton
                color="primary"
                onClick={() => {
                  if (post?.likedByCaller) {
                    service.removeLike(post?.postId);
                  } else {
                    service.addLike(post?.postId);
                  }
                  handleLikePost();
                }}
              >
                {post?.likedByCaller ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Box>{parseInt(post?.likesQty)}</Box>
            </Box>
            <Box>
              <Typography variant="body1">
                {post?.post?.postBasics?.description}
              </Typography>
            </Box>
          </Box>
          {post?.artistUsername === localStorage.getItem("username") && (
            <Box style={{ marginLeft: "auto" }}>
              <IconButton
                color="primary"
                onClick={async () => {
                  setIsLoading(true);
                  await service.removePost(post?.postId);
                  setIsLoading(false);
                  navigate(-1);
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={32} /> : <DeleteIcon />}
              </IconButton>
              <IconButton
                color="primary"
                disabled={isLoading}
                onClick={() => setIsEditPost(true)}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box style={{ marginTop: 24 }}>
          <Box style={{ display: "flex" }}>
            <Box style={{ marginRight: 8 }}>
              <CameraAltIcon color="primary" />
            </Box>
            <Box>
              <Typography variant="p">{camera}</Typography>
            </Box>
          </Box>
          <Box style={{ display: "flex" }}>
            <Box style={{ marginRight: 8 }}>
              <CameraOutlinedIcon color="primary" />
            </Box>
            <Box>
              <Typography variant="p">{lens}</Typography>
            </Box>
          </Box>
        </Box>
        <Box style={{ marginTop: 16 }}>
          <Typography variant="h6">Categories</Typography>
          {post?.post?.postBasics?.tags.map((tag, index) => (
            <Chip
              label={tag}
              variant="outlined"
              style={{ marginBottom: "6px", marginRight: "2px" }}
              key={index}
            />
          ))}
        </Box>
        <Box style={{ marginTop: 16 }}>
          <Typography variant="h6">Comments</Typography>
        </Box>
      </Box>
    </Box>
  );

  function handleLikePost() {
    const currentPost = { ...post };
    if (currentPost.likedByCaller) {
      currentPost.likesQty = parseInt(currentPost.likesQty) - 1;
    } else {
      currentPost.likesQty = parseInt(currentPost.likesQty) + 1;
    }
    currentPost.likedByCaller = !currentPost.likedByCaller;

    setPost(currentPost);
  }
}

export default ArtDetail;
