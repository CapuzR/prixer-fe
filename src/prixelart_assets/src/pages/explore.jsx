import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/explore/mobile.jsx";
import DesktopView from "../views/explore/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

const Explore = ({ isMobile }) => {
  const navigate = useNavigate();
  const { state, handleSidebar, setExplore, setUser, setCurrentPost } =
    useContext(PrixerContext);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };
  console.log(state);
  const init = async () => {
    try {
      const result = await Promise.all([
        service.readPostsByCreation(state.user.username),
        service.getArtistByPrincipal(),
      ]);

      const parsetArtist = service.parseArtist(result[1]);
      console.log(parsetArtist);
      setUser(parsetArtist);
      setExplore(result[0].ok);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in init explore.jsx");
    }
  };

  const handleNavigation = (username) => {
    return navigate(`/u/${username}`);
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

    setExplore(posts);
  };

  const showPostDetails = (id, post) => {
    setCurrentPost(post);
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
      username={state.user.username}
      posts={state.explore}
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
      posts={state.explore}
      handleNavigation={handleNavigation}
      addLike={addLike}
      removeLike={removeLike}
      handleLikePost={handleLikePost}
      showPostDetails={showPostDetails}
    />
  );
};

export default Explore;
