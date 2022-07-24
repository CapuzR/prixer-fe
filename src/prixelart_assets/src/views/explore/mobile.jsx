import React from "react";
import * as React from "react";
import { Box } from "@mui/material";
import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import ListFeed from "../../components/listFeed";

const MobileView = ({
  onLogout,
  handleNavigation,
  posts,
  username,
  addLike,
  removeLike,
  handleLikePost,
  showPostDetails,
}) => {
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Box
        style={{
          marginTop: 60,
          paddingBottom: 60,
        }}
      >
        <ListFeed
          posts={posts}
          handleNavigation={handleNavigation}
          addLike={addLike}
          removeLike={removeLike}
          handleLikePost={handleLikePost}
          showPostDetails={showPostDetails}
        />
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
