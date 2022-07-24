import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
// import { service } from "../../service";
// import consts from "../../consts";
import ListFeed from "../../components/listFeed";

const DesktopView = ({
  onLogout,
  window,
  fullName,
  handleSidebar,
  isOpenSidebar,
  username,
  posts,
  handleNavigation,
  addLike,
  removeLike,
  handleLikePost,
  showPostDetails,
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

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
          {posts?.length === 0 ? (
            <Box
              style={{
                marginTop: 48,
                display: "flex",
                justifyContent: "center",
              }}
            >
              No posts.
            </Box>
          ) : (
            <ListFeed
              posts={posts}
              handleNavigation={handleNavigation}
              addLike={addLike}
              removeLike={removeLike}
              handleLikePost={handleLikePost}
              showPostDetails={showPostDetails}
            />
          )}
          {/* {postSelected && anchorElActionMenuPost !== null && (
            <Menu
              id={`basic-button-post-${postSelected}`}
              anchorEl={anchorElActionMenuPost}
              open={openActionMenuPost}
              onClose={() => {
                setAnchorElActionMenuPost(null);
                setOpenActionMenuPost(false);
                setPostSelected(undefined);
              }}
              className="menuHistorial"
              MenuListProps={{
                "aria-labelledby": `basic-button-post-${postSelected}`,
              }}
            >
              <MenuItem
                onClick={async () => {
                  SetUnfollowLoading(true);
                  await service.removeFollow(detailsPost.artistUsername);
                  setPosts(
                    posts.filter(
                      (post) =>
                        post.artistUsername !== detailsPost.artistUsername
                    )
                  );
                  setPostSelected(undefined);
                  setDetailsPost(undefined);
                  setAnchorElActionMenuPost(null);
                  setOpenActionMenuPost(false);
                  SetUnfollowLoading(false);
                }}
              >
                Unfollow
              </MenuItem>
            </Menu>
          )} */}
        </Box>
      </Box>
      <ActionButton />
    </Box>
  );
};

export default DesktopView;
