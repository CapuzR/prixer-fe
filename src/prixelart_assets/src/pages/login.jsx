import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/login/mobile.jsx";
import DesktopView from "../views/login/desktop.jsx";

import { service } from "../service.js";
import { PrixerContext } from "../context/index.jsx";

const Login = ({ isMobile }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(PrixerContext);
  const [isLoading, setIsLoading] = useState(false);
  const onLoginStoic = async () => {
    setIsLoading(true);
    await service.onSignInStoic();
    const user = await service.getArtistByPrincipal();
    localStorage.setItem("wallet", "Stoic");
    if (user.length === 0) {
      navigate("/registry");
    } else {
      const parseArtist = service.parseArtist(user);
      setUser(parseArtist);
      navigate("/explore");
    }
    setIsLoading(false);
  };

  const onLoginPlug = async () => {
    await service.onSignInPlug();
  };

  useEffect(() => {
    if (localStorage.getItem("wallet")) {
      navigate("/explore");
    }
  });

  return isMobile ? (
    <MobileView
      onLoginStoic={onLoginStoic}
      isMobile={isMobile}
      onLoginPlug={onLoginPlug}
      isLoading={isLoading}
    />
  ) : (
    <DesktopView
      onLoginStoic={onLoginStoic}
      isMobile={isMobile}
      onLoginPlug={onLoginPlug}
      isLoading={isLoading}
    />
  );
};

export default Login;
