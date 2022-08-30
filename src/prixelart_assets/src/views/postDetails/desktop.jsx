import React from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
import InfoPost from "../../components/infoPost";
import PostForm from "../../components/postForm";

const DesktopView = ({
  onLogout,
  window,
  fullName,
  handleSidebar,
  isOpenSidebar,
  username,
  handleIsUpdatePost,
  isUpdatePost,
  isMobile,
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
  isLoading,
  onRemoveComment,
  deleteComment,
  isDelete,
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
        isLoading={isUpdatePost ? isLoading : isDelete ? true : false}
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
          {!isUpdatePost && (
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
          )}

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
              isLoading={isLoading}
            />
          ) : !isDelete && isLoading ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 32,
              }}
            >
              <CircularProgress />
            </Box>
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
              onAddComment={onAddComment}
              createComment={createComment}
              deletePost={deletePost}
              galleries={galleries}
              artist={artist}
              onRemoveComment={onRemoveComment}
              deleteComment={deleteComment}
              isDelete={isDelete}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>

      <ActionButton
        isLoading={isUpdatePost ? isLoading : isDelete ? true : false}
      />
    </Box>
  );
};

export default DesktopView;
