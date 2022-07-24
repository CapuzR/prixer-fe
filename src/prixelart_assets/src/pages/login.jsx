import React, { useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/login/mobile.jsx";
import DesktopView from "../views/login/desktop.jsx";

import { service } from "../service.js";
import { PrixerContext } from "../context/index.jsx";

const Login = ({ isMobile }) => {
  const navigate = useNavigate();
  const { state, setUser } = useContext(PrixerContext);
  const onLoginStoic = async () => {
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
    />
  ) : (
    <DesktopView
      onLoginStoic={onLoginStoic}
      isMobile={isMobile}
      onLoginPlug={onLoginPlug}
    />
  );
};

export default Login;
