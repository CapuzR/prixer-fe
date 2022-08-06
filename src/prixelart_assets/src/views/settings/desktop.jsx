import React, { useContext } from "react";
import * as React from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  IconButton,
  Button,
} from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
// import { service } from "../../service";
// import consts from "../../consts";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListSettings from "../../components/listSettings";
import StorageConfig from "../../components/storageConfig";
import ListCanisters from "../../components/listCanisters";

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
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const currentScreen = () => {
    switch (screen) {
      case "settings":
        return <ListSettings isMobile={isMobile} handleScreen={handleScreen} />;
      case "storage_config":
        return (
          <StorageConfig
            onSetupStorageUnits={createInvoice}
            invoice={invoice}
            transfer={transfer}
            verifyPayment={verifyPayment}
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
        return <ListSettings isMobile={isMobile} handleScreen={handleScreen} />;
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
      <ActionButton />
    </Box>
  );
};

export default DesktopView;
