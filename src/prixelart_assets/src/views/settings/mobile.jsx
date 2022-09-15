import React from "react";
import * as React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import ListSettings from "../../components/listSettings";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorageConfig from "../../components/storageConfig";
import ListCanisters from "../../components/listCanisters";

const MobileView = ({
  onLogout,
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
}) => {
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
    }
  };

  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Box
        style={{
          marginTop: 60,
          paddingBottom: 60,
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
              style={{ position: screen !== "list_storage" && "absolute" }}
              onClick={() =>
                screen !== "settings"
                  ? screen === "list_storage"
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
      <NavigationBar username={username} isLoading={isLoading} />
    </Box>
  );
};

export default MobileView;
