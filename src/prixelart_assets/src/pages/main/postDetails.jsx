import React, { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";

import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

import Navbar from "../../components/navbar";
import ArtDetail from "../../components/artDetail";
import service from "../service";

function PostDetails() {
  const toolbarHeight = 68;
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const [post, setPost] = useState();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    async function init() {
      const post = await service.getPostByID(params.postId);
      setPost(post.ok);
      console.log(post.ok);
      // console.log(post);
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
      <Box style={{ paddingTop: toolbarHeight }}>
        <ArtDetail
          post={post}
          navigate={navigate}
          mobileBreakpoint={mobileBreakpoint}
        />
      </Box>
    </div>
  );

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }
}

export default PostDetails;
