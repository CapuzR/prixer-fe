import React, { useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/settings/mobile.jsx";
import DesktopView from "../views/settings/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const Settings = ({ isMobile }) => {
  const navigate = useNavigate();
  const { state, handleSidebar, setFeed } = useContext(PrixerContext);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
  }, []);

  return isMobile ? (
    <MobileView
      isMobile={isMobile}
      onLogout={onLogout}
      fullName={state.user.fullName}
      username={state.user.username}
      handleNavigation={handleNavigation}
    />
  ) : (
    <DesktopView
      isMobile={isMobile}
      onLogout={onLogout}
      handleSidebar={handleSidebar}
      isOpenSidebar={state.isOpenSidebar}
      fullName={state.user.fullName}
      username={state.user.username}
      handleNavigation={handleNavigation}
    />
  );
};

export default Settings;
