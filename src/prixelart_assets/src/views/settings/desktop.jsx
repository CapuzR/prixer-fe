import React, { useContext } from "react";
import * as React from "react";
import { Box, Paper, Grid, Typography, IconButton } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
// import { service } from "../../service";
// import consts from "../../consts";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListSettings from "../../components/listSettings";
import StorageConfig from "../../components/storageConfig";

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
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const currentScreen = () => {
    switch (screen) {
      case "settings":
        return <ListSettings isMobile={isMobile} handleScreen={handleScreen} />;
      case "storage":
        return (
          <StorageConfig
            onSetupStorageUnits={createInvoice}
            invoice={invoice}
            transfer={transfer}
            verifyPayment={verifyPayment}
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
                  ? handleScreen("settings")
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
          </Box>
          {currentScreen()}
        </Box>
      </Box>
      <ActionButton />
    </Box>
  );
};

export default DesktopView;
