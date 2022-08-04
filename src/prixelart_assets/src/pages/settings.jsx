import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/settings/mobile.jsx";
import DesktopView from "../views/settings/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const Settings = ({ isMobile }) => {
  const navigate = useNavigate();
  const { state, handleSidebar, setFeed } = useContext(PrixerContext);
  const [screen, setScreen] = useState("settings");
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState();

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleScreen = (view) => {
    setScreen(view);
  };
  const createInvoice = async (amount, quantity) => {
    try {
      setIsLoading(true);
      const result = await service.createInvoice("ICP", amount, quantity);
      setInvoice(result.ok);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      console.log("[Error in create invoice settings.jsx");
    }
  };

  const transfer = async (account, amount) => {
    return await service.transfer(account, amount);
  };

  const verifyPayment = async (invoiceId) => {
    try {
      const result = await service.verifyInvoice(invoiceId);
      console.log(result, "RESULT");
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPayment settings.jsx]");
    }
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
      screen={screen}
      handleScreen={handleScreen}
      createInvoice={createInvoice}
      isLoading={isLoading}
      invoice={invoice}
      transfer={transfer}
      verifyPayment={verifyPayment}
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
      screen={screen}
      handleScreen={handleScreen}
      createInvoice={createInvoice}
      isLoading={isLoading}
      invoice={invoice}
      transfer={transfer}
      verifyPayment={verifyPayment}
    />
  );
};

export default Settings;
