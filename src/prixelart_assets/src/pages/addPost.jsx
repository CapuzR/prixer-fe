import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/addPost/mobile.jsx";
import DesktopView from "../views/addPost/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const AddPost = ({ isMobile }) => {
  const { state, handleSidebar, setPostsDetails } = useContext(PrixerContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const createPost = async (post, blob) => {
    setIsLoading(true);
    try {
      const result = await service.createPost(post, blob);
      const profile = await service.getArtistDetailsByUsername(
        state.user.username
      );
      setPostsDetails(profile.ok);
      navigate(-1);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create post addPost.jsx");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
  }, []);

  return isMobile ? (
    <MobileView
      isMobile={isMobile}
      onLogout={onLogout}
      username={state.user.username}
      fullName={state.user.fullName}
      artist={state.user}
      createPost={createPost}
      galleries={state.galleries}
      isLoading={isLoading}
    />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      username={state.user.username}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      artist={state.user}
      createPost={createPost}
      galleries={state.galleries}
      isLoading={isLoading}
    />
  );
};

export default AddPost;
