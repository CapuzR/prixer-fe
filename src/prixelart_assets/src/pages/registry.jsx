import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/registry/mobile.jsx";
import DesktopView from "../views/registry/desktop.jsx";
import { service } from "../service.js";
import { PrixerContext } from "../context/index";
import consts from "../consts.js";

const Registry = ({ isMobile }) => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(consts.registry_artist_form_view);
  const { state, setUser } = useContext(PrixerContext);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const init = async () => {
    if (!localStorage.getItem("wallet")) {
      return onLogout();
    } else {
      const artist = await service.getArtistByPrincipal();
      if (artist.length > 0) {
        const parsetArtist = service.parseArtist(artist);
        setUser(parsetArtist);
        alert("User already exist!");
        return navigate("/explore");
      }
    }
  };

  const handleScreen = (view) => {
    setScreen(view);
  };

  const createArtist = async (artist, username) => {
    try {
      const result = await Promise.all([
        service.addArtist(artist),
        service.relPrincipalWithUsername(username),
      ]);
      const parsetArtist = service.parseArtist([artist]);
      setUser(parsetArtist);
      handleScreen(consts.registry_payment_form_view);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create artist registry.jsx");
    }
  };

  const onAcceptmembership = (type) => {
    if (type === "premium") {
      handleScreen(consts.registry_storage_form_view);
    } else {
      handleScreen(consts.registry_post_form_view);
    }
  };

  const onSetupStorageUnits = () => {
    handleScreen(consts.registry_post_form_view);
  };

  const createPost = async (post, blob) => {
    try {
      const result = await service.createPost(post, blob);
      navigate("/explore");
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create post registry.jsx");
    }
  };

  const onSkip = async () => {
    navigate("/explore");
  };

  useEffect(() => {
    init();
  }, []);

  return isMobile ? (
    <MobileView
      onLogout={onLogout}
      screen={screen}
      isMobile={isMobile}
      createArtist={createArtist}
      onAcceptmembership={onAcceptmembership}
      onSetupStorageUnits={onSetupStorageUnits}
      artist={state.user}
      onSkip={onSkip}
      createPost={createPost}
    />
  ) : (
    <DesktopView
      onLogout={onLogout}
      screen={screen}
      isMobile={isMobile}
      createArtist={createArtist}
      handleScreen={handleScreen}
      onAcceptmembership={onAcceptmembership}
      onSetupStorageUnits={onSetupStorageUnits}
      artist={state.user}
      onSkip={onSkip}
      createPost={createPost}
    />
  );
};

export default Registry;
