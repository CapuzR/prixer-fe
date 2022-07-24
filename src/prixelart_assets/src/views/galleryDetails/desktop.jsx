import React from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
// import { service } from "../../service";
// import consts from "../../consts";

import ListPosts from "../../components/listPosts";
import SearchBar from "../../components/searchBar";

const DesktopView = ({
  onLogout,
  window,
  fullName,
  handleSidebar,
  isOpenSidebar,
  username,
  posts,
  addLike,
  removeLike,
  handleLikePost,
  search,
  showPostDetails,
  handleSearch,
  isMobile,
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Sidebar
        drawerwidth={isOpenSidebar ? 240 : 80}
        container={container}
        isOpenSideMenu={isOpenSidebar}
        handleSidebar={handleSidebar}
        fullName={fullName}
        username={username}
      />
      <Box
        style={{
          marginTop: 60,
        }}
      >
        <Box
          style={{
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 12,
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <IconButton
              color="primary"
              onClick={() => navigate(-1)}
              style={{ position: "absolute" }}
            >
              <ArrowBackIcon fontSize="medium" />
            </IconButton>

            <Box
              style={{
                display: "flex",

                width: "100%",
              }}
            >
              <Typography
                style={{ margin: "auto" }}
                variant={isMobile ? "h5" : "h4"}
              >
                Gallery
              </Typography>
            </Box>
          </Box>
          <Box style={{ padding: 8 }}>
            <SearchBar search={search} handleSearch={handleSearch} />
          </Box>
          <ListPosts
            search={search}
            showPostDetails={showPostDetails}
            addLike={addLike}
            removeLike={removeLike}
            handleLikePost={handleLikePost}
            posts={posts ? posts : []}
          />
        </Box>
      </Box>
      <ActionButton />
    </Box>
  );
};

export default DesktopView;
