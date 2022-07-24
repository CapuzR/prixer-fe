import React, { useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/feed/mobile.jsx";
import DesktopView from "../views/feed/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const Feed = ({ isMobile }) => {
  const navigate = useNavigate();
  const { state, handleSidebar, setFeed } = useContext(PrixerContext);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const init = async () => {
    try {
      const result = await service.readPostByFollowers(state.user.username);

      console.log(result.ok);
      setFeed(result.ok);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in init feed.jsx");
    }
  };

  const handleNavigation = (username) => {
    navigate(`/u/${username}`);
  };

  const addLike = async (id) => {
    try {
      const result = await service.addLike(id);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in add like postDetails.jsx");
    }
  };

  const removeLike = async (id) => {
    try {
      const result = await service.removeLike(id);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in add like postDetails.jsx");
    }
  };

  const handleLikePost = (postId) => {
    const posts = state.explore;

    const currentPost = posts.find((el) => el.postId === postId);
    if (currentPost.likedByCaller) {
      currentPost.likesQty = parseInt(currentPost.likesQty) - 1;
    } else {
      currentPost.likesQty = parseInt(currentPost.likesQty) + 1;
    }
    currentPost.likedByCaller = !currentPost.likedByCaller;

    setFeed(posts);
  };

  const showPostDetails = (id) => {
    navigate(`/post/${id}/details`);
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
    init();
  }, []);

  return isMobile ? (
    <MobileView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      username={state.user.username}
      posts={state.feed}
      handleNavigation={handleNavigation}
      addLike={addLike}
      removeLike={removeLike}
      handleLikePost={handleLikePost}
      showPostDetails={showPostDetails}
    />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      username={state.user.username}
      posts={state.feed}
      handleNavigation={handleNavigation}
      addLike={addLike}
      removeLike={removeLike}
      handleLikePost={handleLikePost}
      showPostDetails={showPostDetails}
    />
  );
};

export default Feed;
