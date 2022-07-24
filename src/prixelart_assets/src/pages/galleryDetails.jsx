import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import MobileView from "../views/galleryDetails/mobile.jsx";
import DesktopView from "../views/galleryDetails/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const GalleryDetails = ({ isMobile }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { state, handleSidebar, setCurrentPost } = useContext(PrixerContext);
  const [posts, setPosts] = useState();
  const [search, setSearch] = useState("");

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const init = async () => {
    try {
      const result = await service.readPostsByGallery(params.galleryId);
      console.log(result);
      setPosts(result.ok);
    } catch (err) {
      console.log(err);
      console.log("[Error  init galleryDetails.jsx]");
    }
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
    const postsDB = [...posts];
    const currentPost = postsDB.find((el) => el.postId === postId);
    if (currentPost.likedByCaller) {
      currentPost.likesQty = parseInt(currentPost.likesQty) - 1;
    } else {
      currentPost.likesQty = parseInt(currentPost.likesQty) + 1;
    }

    currentPost.likedByCaller = !currentPost.likedByCaller;

    setPosts(postsDB);
  };

  const showPostDetails = (id, post) => {
    setCurrentPost(post);
    navigate(`/post/${id}/details`);
  };

  const handleSearch = (search) => {
    setSearch(search);
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
      addLike={addLike}
      removeLike={removeLike}
      handleLikePost={handleLikePost}
      posts={posts}
      showPostDetails={showPostDetails}
      search={search}
      handleSearch={handleSearch}
    />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      username={state.user.username}
      addLike={addLike}
      removeLike={removeLike}
      handleLikePost={handleLikePost}
      posts={posts}
      showPostDetails={showPostDetails}
      search={search}
      handleSearch={handleSearch}
    />
  );
};

export default GalleryDetails;
