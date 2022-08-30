import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/addGallery/mobile.jsx";
import DesktopView from "../views/addGallery/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

const AddGallery = ({ isMobile }) => {
  const { state, handleSidebar, setGalleries } = useContext(PrixerContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const createGallery = async (gallery) => {
    setIsLoading(true);
    try {
      const result = await service.createGallery(gallery);
      const galleries = await service.getGalleriesByArtist(state.user.username);
      setGalleries(galleries.ok);
      navigate(-1);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create gallery addGallery.jsx");
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
      createGallery={createGallery}
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
      createGallery={createGallery}
      galleries={state.galleries}
      isLoading={isLoading}
    />
  );
};

export default AddGallery;
