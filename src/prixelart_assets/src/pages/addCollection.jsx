import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/addCollection/mobile.jsx";
import DesktopView from "../views/addCollection/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

const AddCollection = ({ isMobile }) => {
  const { state, handleSidebar } = useContext(PrixerContext);
  const navigate = useNavigate();
  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const createCollection = async (
    name,
    symbol,
    suplay,
    website,

    prixelart
  ) => {
    try {
      const result = await service._createNFTCanister(state.user.canisterId, {
        nFTMetadata: {
          name,
          symbol: symbol,
          supply: [Number(suplay)],
          website: [website],
          socials: [],
          prixelart: [prixelart],
        },
        creator: JSON.parse(localStorage.getItem("_scApp")).principal,
      });
      navigate(-1);
      console.log(result);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create collection addCollection.jsx");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
  }, []);

  return isMobile ? (
    <MobileView
      isMobile={isMobile}
      onLogout={onLogout}
      createCollection={createCollection}
    />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      username={state.user.username}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      createCollection={createCollection}
    />
  );
};

export default AddCollection;
