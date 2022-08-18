import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import MobileView from "../views/detailsCollections/mobile.jsx";
import DesktopView from "../views/detailsCollections/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

const DetailsCollection = ({ isMobile }) => {
  const { state, handleSidebar } = useContext(PrixerContext);
  const [isMint, setIsMint] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
  }, []);

  const handleView = (screen) => {
    setIsMint(screen);
  };

  const onBack = () => {
    setIsMint(false);
  };

  const mintNFT = async (payload) => {
    try {
      const result = await service._mintNFT(params.collectionId, payload);
      if (result.ok) setIsMint(false);
    } catch (err) {
      console.log(err);
      console.log("[ERR IN MINT NFT]");
    }
  };

  const publishCollection = async () => {
    try {
      const result = await service._publishNFTCollection(params.collectionId);
    } catch (err) {
      console.log(err);
      console.log("[ERR IN MINT NFT]");
    }
  };

  return isMobile ? (
    <MobileView
      isMobile={isMobile}
      onLogout={onLogout}
      username={state.user.username}
      fullName={state.user.fullName}
      artist={state.user}
      handleView={handleView}
      collection={state.user.collections.find(
        (collection) => collection.principal === params.collectionId
      )}
      isMint={isMint}
      onBack={onBack}
      mintNFT={mintNFT}
      publishCollection={publishCollection}
    />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      username={state.user.username}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      handleView={handleView}
      collection={state.user.collections.find(
        (collection) => collection.principal === params.collectionId
      )}
      isMint={isMint}
      onBack={onBack}
      mintNFT={mintNFT}
      publishCollection={publishCollection}
    />
  );
};

export default DetailsCollection;
