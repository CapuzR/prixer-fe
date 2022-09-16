import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MobileView from "../views/settings/mobile.jsx";
import DesktopView from "../views/settings/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const Settings = ({ isMobile }) => {
  const navigate = useNavigate();
  const {
    state,
    handleSidebar,
    setPrivateCanisterInfo,
    setAssetPrivateCanisterInfo,
    setUser,
  } = useContext(PrixerContext);
  const [screen, setScreen] = useState("settings");
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState();
  const [_canisterContractInfo, _setCanisterContractInfo] = useState(
    state.privateCanisterInfo
  );
  const [_assetCanisterContractInfo, _setAssetCanisterContractInfo] = useState(
    state.privateAssetCanisterInfo
  );

  const [paymentHistoryPrincipal, setPaymentHistoryPrincipal] = useState([]);
  const [priInvoice, setPriInvoices] = useState([]);

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
      console.log(amount);
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
    setIsLoading(true);
    try {
      const result = await service.verifyInvoice(invoiceId, "storage");
      const profile = await service.getArtistByPrincipal();

      const parseArtist = service.parseArtist(profile);
      setUser(parseArtist);
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPayment settings.jsx]");
    }
    setIsLoading(false);
  };

  const getContractInfo = async () => {
    try {
      const result = await service._canisterContactInfo(state.user.canisterId);
      result.cycles = Number(result.cycles);
      result.heapSize = Number(result.heapSize);
      result.maxLiveSize = Number(result.maxLiveSize);
      result.memorySize = Number(result.memorySize);
      setPrivateCanisterInfo(result);
      console.log(result);
    } catch (err) {
      console.log(err);
      console.log("[Err in get _canisterContractInfo settings.jsx]");
    }
  };

  const getAssetContractInfo = async () => {
    try {
      const promises = state.user.assetCanisterId.map((canister) =>
        service._assetCanisterContractInfo(canister)
      );
      const result = await Promise.all(promises);
      setAssetPrivateCanisterInfo(result);
      console.log(result);
    } catch (err) {
      console.log(err);
      console.log("[Err in get _canisterContractInfo settings.jsx]");
    }
  };

  const createCollection = async (valueCollection) => {
    setIsLoading(true);
    try {
      const result = await service._createNFTCanister(state.user.canisterId, {
        nFTMetadata: {
          name: `WH-${state.user.username}`,
          symbol: "ICP",
          supply: [1],
          website: ["N/A"],
          socials: [],
          prixelart: ["N/A"],
          value: [parseInt(valueCollection)],
        },
        creator: JSON.parse(localStorage.getItem("_scApp")).principal,
      });
      return result;
    } catch (err) {
      console.log(err);
      console.log("[ERR] => Error in create collection addCollection.jsx");
    }
    setIsLoading(false);
  };

  const mintNFT = async (id, payload) => {
    return service._mintWH(id, payload);
  };

  const verifyPaymentWH = async (invoiceId, valueCollection) => {
    setIsLoading(true);
    try {
      const transferResponse = await transfer(
        invoice.subAccount,
        parseInt(invoice.invoice.amount)
      );
      if (transferResponse) {
        const result = await service.verifyInvoice(invoiceId, "collection");
        if (result.ok.ok) {
          const resultNFTCan = await createCollection(valueCollection);
          await mintNFT(resultNFTCan.ok.principal.toText(), [
            {
              payload: {
                Payload: [123],
              },
              contentType: "WH",
              owner: [],
              properties: [
                {
                  name: "WH",
                  value: { Int: parseInt(valueCollection) },
                  immutable: true,
                },
              ],
              isPrivate: false,
            },
            {
              payload: {
                Payload: [123],
              },
              contentType: "WH",
              owner: [],
              properties: [
                {
                  name: "WH",
                  value: { Int: parseInt(valueCollection) },
                  immutable: true,
                },
              ],
              isPrivate: false,
            },
          ]);
          // await service._publishNFTCollection(
          //   resultNFTCan.ok.principal.toText()
          // );
        }
      }
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPaymentWH settings.jsx]");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("wallet")) onLogout();
  }, []);

  useEffect(() => {
    if (state.user.canisterId) getContractInfo();
  }, []);

  useEffect(() => {
    if (state.user.canisterId) getAssetContractInfo();
  }, []);

  useEffect(async () => {
    try {
      const payments = await service.getinvoices();
      setPaymentHistoryPrincipal(payments.ok);
      const paymentsPri = await service.getinvoicesPri(state.user.canisterId);
      setPriInvoices(paymentsPri.ok);
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(paymentHistoryPrincipal, "ASDASd");
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
      artist={state.user}
      _canisterContractInfo={_canisterContractInfo}
      _assetCanisterContractInfo={_assetCanisterContractInfo}
      verifyPaymentWH={verifyPaymentWH}
      setIsLoading={setIsLoading}
      paymentHistoryPrincipal={paymentHistoryPrincipal}
      riInvoice={priInvoice}
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
      artist={state.user}
      _canisterContractInfo={_canisterContractInfo}
      _assetCanisterContractInfo={_assetCanisterContractInfo}
      verifyPaymentWH={verifyPaymentWH}
      setIsLoading={setIsLoading}
      paymentHistoryPrincipal={paymentHistoryPrincipal}
      priInvoice={priInvoice}
    />
  );
};

export default Settings;
