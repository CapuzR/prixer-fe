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
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ArtDetail({ post, navigate, mobileBreakpoint }) {
  return (
    <Box>
      <Box style={{ padding: 16 }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">Post Detail</Typography>

          <IconButton
            color="primary"
            onClick={() => navigate("/main")}
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
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="body1">
                {post?.post?.postBasics?.description}
              </Typography>
            </Box>
          </Box>
          <Box style={{ marginLeft: "auto" }}>
            <IconButton
              color="primary"
              // onClick={() => deleteArt(searchParams.get("image"))}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        {/*<Box style={{ marginTop: 24 }}>
          <Box style={{ display: "flex" }}>
            <Box style={{ marginRight: 8 }}>
              <CameraAltIcon color="primary" />
            </Box>
            <Box>
              <Typography variant="p">
                {
                  arts
                    .find((art) => art.id === searchParams.get("image"))
                    ?.info?.artBasics?.tools[0]?.find(
                      (tl) => tl.category.name === "Camera"
                    ).name
                }
              </Typography>
            </Box>
          </Box>
          <Box style={{ display: "flex" }}>
            <Box style={{ marginRight: 8 }}>
              <CameraOutlinedIcon color="primary" />
            </Box>
            <Box>
              <Typography variant="p">
                {
                  arts
                    .find((art) => art.id === searchParams.get("image"))
                    ?.info?.artBasics?.tools[0]?.find(
                      (tl) => tl.category.name === "Lens"
                    ).name
                }
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box style={{ marginTop: 16 }}>
          <Typography variant="h6">Categories</Typography>
          {arts
            .find((art) => art.id === searchParams.get("image"))
            ?.info?.artBasics?.tags?.map((tag, index) => (
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
        </Box>*/}
      </Box>
    </Box>
  );
}

export default ArtDetail;
