import React from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import InfoPost from "../../components/infoPost";
import PostForm from "../../components/postForm";

const MobileView = ({
  isMobile,
  onLogout,
  username,
  handleIsUpdatePost,
  isUpdatePost,
  post,
  addLike,
  handleLikePost,
  removeLike,
  camera,
  lens,
  onAddComment,
  createComment,
  artist,
  updatePost,
  deletePost,
  galleries,
}) => {
  const navigate = useNavigate();
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Box
        style={{
          marginTop: 60,
          paddingBottom: 60,
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
            paddingTop: 4,
          }}
        >
          <IconButton
            color="primary"
            onClick={() =>
              isUpdatePost ? handleIsUpdatePost(false) : navigate(-1)
            }
            style={{ position: "absolute" }}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"}>
              Post details
            </Typography>
          </Box>
        </Box>
        {isUpdatePost ? (
          <PostForm
            isMobile={isMobile}
            isFirstArt={false}
            artist={artist}
            onSkip={undefined}
            updatePost={console.log}
            createPost={undefined}
            isUpdate={true}
            artist={artist}
            handleIsUpdatePost={handleIsUpdatePost}
            post={post}
            updatePost={updatePost}
            galleries={galleries}
          />
        ) : (
          <InfoPost
            post={post}
            username={username}
            handleIsUpdatePost={handleIsUpdatePost}
            addLike={addLike}
            handleLikePost={handleLikePost}
            removeLike={removeLike}
            camera={camera}
            lens={lens}
            createComment={createComment}
            onAddComment={onAddComment}
            isMobile={isMobile}
            deletePost={deletePost}
            galleries={galleries}
          />
        )}
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
