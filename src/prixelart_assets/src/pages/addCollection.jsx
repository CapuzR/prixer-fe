import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/addCollection/mobile.jsx";
import DesktopView from "../views/addCollection/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const AddCollection = ({ isMobile }) => {
  const { state, handleSidebar } = useContext(PrixerContext);
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    await service.onSignOutStoic();
    localStorage.clear();
    navigate("/");
  };

  const createInvoice = async (amount, quantity) => {
    setIsLoading(true);
    try {
      const result = await service.createInvoice("ICP", amount, quantity);
      setInvoice(result.ok);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      console.log("[Error in create invoice settings.jsx");
    }
    setIsLoading(false);
  };

  const transfer = async (account, amount) => {
    return await service.transfer(account, amount);
  };

  const verifyPayment = async (
    invoiceId,
    name,
    symbol,
    suplay,
    website,
    prixelart,
    valueCollection
  ) => {
    setIsLoading(true);
    try {
      const result = await service.verifyInvoice(invoiceId, "collection");
      if (result.ok.ok) {
        const resultNFTCan = await createCollection(
          name,
          symbol,
          suplay,
          website,
          prixelart,
          valueCollection
        );
      }
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPayment settings.jsx]");
    }
    setIsLoading(false);
  };

  const createCollection = async (
    name,
    symbol,
    suplay,
    website,
    prixelart,
    valueCollection
  ) => {
    setIsLoading(true);
    try {
      const result = await service._createNFTCanister(state.user.canisterId, {
        nFTMetadata: {
          name,
          symbol: symbol,
          supply: [Number(suplay)],
          website: [website],
          socials: [],
          prixelart: [prixelart],
          value: [parseInt(valueCollection)],
        },
        creator: JSON.parse(localStorage.getItem("_scApp")).principal,
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create collection addCollection.jsx");
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
      createCollection={createCollection}
      createInvoice={createInvoice}
      transfer={transfer}
      verifyPayment={verifyPayment}
      invoice={invoice}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
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
      createInvoice={createInvoice}
      transfer={transfer}
      verifyPayment={verifyPayment}
      invoice={invoice}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
};

export default AddCollection;
