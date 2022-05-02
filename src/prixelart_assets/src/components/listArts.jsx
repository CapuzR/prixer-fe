import React, { useState } from "react";
import * as React from "react";
import Masonry from "@mui/lab/Masonry";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import service from "../pages/service";

function ListArts({ arts, navigate, setDetails, details }) {
  return (
    <Masonry columns={3} spacing={0.2}>
      {arts?.map((item, index) => (
        <div key={index}>
          <img
            onClick={() => navigate(`/post/${item.postId}`)}
            src={`${item.post.postBasics.asset}`}
            srcSet={`${item.post.postBasics.asset}`}
            alt={index}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
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
          </div>
        </div>
      ))}
    </Masonry>
  );

  function handleLikePost(postId) {
    const posts = [...arts];
    const currentPost = posts.findIndex((post) => post.postId === postId);
    if (posts[currentPost].likedByCaller) {
      posts[currentPost].likesQty = parseInt(posts[currentPost].likesQty) - 1;
    } else {
      posts[currentPost].likesQty = parseInt(posts[currentPost].likesQty) + 1;
    }
    posts[currentPost].likedByCaller = !posts[currentPost].likedByCaller;
    const formatPosts = [posts];
    setDetails({ ...details, postsRead: formatPosts });
  }
}

export default ListArts;
