import React, { useState, useEffect, useContext } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";

import MobileView from "../views/detailsCollections/mobile.jsx";
import DesktopView from "../views/detailsCollections/desktop.jsx";
import { PrixerContext } from "../context/index.jsx";
import { service } from "../service.js";

const DetailsCollection = ({ isMobile }) => {
  const { state, handleSidebar } = useContext(PrixerContext);
  const [isMint, setIsMint] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [tokens, setTokens] = useState([]);
  const [token, setToken] = useState();
  const [invoice, setInvoice] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);

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

  const transfer = async (account, amount) => {
    return await service.transfer(account, amount);
  };

  const isConfirmPayment = async () => {
    setIsLoading(true);
    setIsPayment(true);
    const transferResponse = await transfer(
      invoice.subAccount,
      parseInt(invoice.invoice.amount)
    );
    if (transferResponse) {
      await verifyPayment(invoice.invoice.id, token);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const verifyPayment = async (invoiceId, tokenId) => {
    setIsLoading(true);
    setIsPayment(true);
    try {
      const result = await service._verifyPayment(
        invoiceId,
        params.collectionId,
        tokenId,
        JSON.parse(localStorage.getItem("_scApp")).principal,
        state.user.canisterId
      );
    } catch (err) {
      console.log(err);
      console.log("[Err in varifyPayment collectionDeetails.jsx]");
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  const mintNFT = async (payload) => {
    setIsLoading(true);
    try {
      const result = await service._mintNFT(params.collectionId, payload);
      if (result.ok) {
        await listNFT(params.collectionId);
        setIsMint(false);
      }
    } catch (err) {
      console.log(err);
      console.log("[ERR IN MINT NFT]");
    }
    setIsLoading(false);
  };

  const publishCollection = async () => {
    setIsLoading(true);
    try {
      const result = await service._publishNFTCollection(params.collectionId);
    } catch (err) {
      console.log(err);
      console.log("[ERR IN MINT NFT]");
    }
    setIsLoading(false);
  };

  const listNFT = async (id) => {
    setIsLoading(true);
    try {
      const result = await service._listNFT(id);
      setTokens(result);
    } catch (err) {
      console.log(err);
      console.log("[ERR IN LIST NFT]");
    }
    setIsLoading(false);
  };

  const createInvoice = async (amount, tokenId) => {
    setIsLoading(true);
    setIsPayment(true);
    try {
      setToken(tokenId);

      const result = await service._createInvoice(
        "ICP",
        amount,
        1,
        state.user.canisterId
      );
      setInvoice(result.ok);
    } catch (err) {
      console.log(err);
      console.log("[Error in create invoice settings.jsx");
    }
    setIsLoading(false);
    setIsPayment(false);
  };

  useEffect(() => {
    listNFT(params.collectionId);
    // authorize({
    //   id: params.collectionId,
    //   p: params.collectionId,
    //   isAuthorized: true,
    // });
  }, []);

  return isMobile ? (
    <>
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
        tokens={tokens}
        createInvoice={createInvoice}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        isPayment={isPayment}
      />
      {invoice && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Payment confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box>{`
        Do you want to confirm the payment for the amount ${
          parseInt(invoice.invoice.amount) / 100000000
        } of ICP?`}</Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={isLoading} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => isConfirmPayment()}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  ) : (
    <>
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
        tokens={tokens}
        createInvoice={createInvoice}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        isPayment={isPayment}
      />
      {invoice && (
        <Dialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setToken(undefined);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Payment confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box>{`
        Do you want to confirm the payment for the amount ${
          parseInt(invoice.invoice.amount) / 100000000
        } of ICP?`}</Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={isLoading} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => isConfirmPayment()}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DetailsCollection;
