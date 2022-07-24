import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import PostForm from "../../components/postForm";

const MobileView = ({
  onLogout,
  username,
  isMobile,
  artist,
  createPost,
}) => {
  return (
    <Box style={{ height: "calc(100vh - 60px)", overflow: "scroll" }}>
      <Navbar onLogout={onLogout} />
      <Box
        style={{
          marginTop: 60,
        }}
      >
        <Box
          style={{ maxWidth: 1000, marginLeft: "auto", marginRight: "auto" }}
        >
          <Box style={{ textAlign: "center" }}>
            <PostForm
              isMobile={isMobile}
              artist={artist}
              onSkip={console.log}
              createPost={createPost}
            />
          </Box>
        </Box>
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
