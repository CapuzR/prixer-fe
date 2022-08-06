import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/addPost/mobile.jsx";
import DesktopView from "../views/addPost/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

const AddPost = ({ isMobile }) => {
  const { state, handleSidebar } = useContext(PrixerContext);
  const navigate = useNavigate();
  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };


  
  console.log(state);
  const createPost = async (post, blob) => {
    try {
      const result = await service.createPost(post, blob);
      navigate("/explore");
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create post registry.jsx");
    }
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
    />
  );
};

export default AddPost;
