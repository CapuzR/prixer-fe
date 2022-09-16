import React from "react";
import * as React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListSettings from "../../components/listSettings";
import StorageConfig from "../../components/storageConfig";
import ListCanisters from "../../components/listCanisters";
import ListInvoices from "../../components/listInvoices";

const DesktopView = ({
  onLogout,
  window,
  fullName,
  handleSidebar,
  isOpenSidebar,
  username,
  isMobile,
  handleNavigation,
  screen,
  handleScreen,
  createInvoice,
  isLoading,
  invoice,
  transfer,
  verifyPayment,
  artist,
  _canisterContractInfo,
  _assetCanisterContractInfo,
  verifyPaymentWH,
  setIsLoading,
  paymentHistoryPrincipal,
  priInvoice,
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const currentScreen = () => {
    switch (screen) {
      case "settings":
        return (
          <ListSettings
            isMobile={isMobile}
            handleScreen={handleScreen}
            createInvoice={createInvoice}
            isLoading={isLoading}
            invoice={invoice}
            verifyPaymentWH={verifyPaymentWH}
            artist={artist}
          />
        );
      case "storage_config":
        return (
          <StorageConfig
            onSetupStorageUnits={createInvoice}
            invoice={invoice}
            transfer={transfer}
            verifyPayment={verifyPayment}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      case "list_storage":
        return (
          <ListCanisters
            artist={artist}
            _canisterContractInfo={_canisterContractInfo}
            _assetCanisterContractInfo={_assetCanisterContractInfo}
          />
        );
      default:
        return (
          <ListInvoices
            type="principal"
            invoicesSub={paymentHistoryPrincipal}
            priInvoice={priInvoice}
          />
        );
    }
  };

  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Sidebar
        drawerwidth={isOpenSidebar ? 240 : 80}
        container={container}
        isOpenSideMenu={isOpenSidebar}
        handleSidebar={handleSidebar}
        fullName={fullName}
        username={username}
        isLoading={isLoading}
      />
      <Box
        style={{
          marginTop: 60,
        }}
      >
        <Box
          style={{
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 12,
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <IconButton
              disabled={isLoading}
              color="primary"
              onClick={() =>
                screen !== "settings"
                  ? screen === "list_storage"
                    ? handleScreen("settings")
                    : screen === "payment_history"
                    ? handleScreen("settings")
                    : handleScreen("list_storage")
                  : handleNavigation(-1)
              }
            >
              <ArrowBackIcon fontSize="medium" />
            </IconButton>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography style={{}} variant={isMobile ? "h5" : "h4"}>
                Settings
              </Typography>
            </Box>
            {screen === "list_storage" && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  onClick={() => handleScreen("storage_config")}
                  style={{
                    color: "#5DBB63",
                  }}
                >
                  Add
                </Button>
              </Box>
            )}
          </Box>
          {currentScreen()}
        </Box>
      </Box>
      <ActionButton isLoading={isLoading} />
    </Box>
  );
};

export default DesktopView;
