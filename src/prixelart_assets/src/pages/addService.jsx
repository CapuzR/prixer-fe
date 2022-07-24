import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/addService/mobile.jsx";
import DesktopView from "../views/addService/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";
import consts from "../consts.js";

const addService = ({ isMobile }) => {
  const { state, handleSidebar } = useContext(PrixerContext);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
  }, []);

  return isMobile ? (
    <MobileView isMobile={isMobile} onLogout={onLogout} />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      username={state.user.username}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
    />
  );
};

export default addService;
