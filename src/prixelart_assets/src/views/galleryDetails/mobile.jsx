import React from "react";
import * as React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import ListPosts from "../../components/listPosts";
import SearchBar from "../../components/searchBar";

const MobileView = ({
  onLogout,
  posts,
  username,
  addLike,
  removeLike,
  handleLikePost,
  showPostDetails,
  search,
  handleSearch,
  isMobile,
}) => {
  const navigate = useNavigate();
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Box
        style={{
          marginTop: 70,
          paddingBottom: 60,
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
          <Box style={{ marginTop: 12 }}>
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
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
