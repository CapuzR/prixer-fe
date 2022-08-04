import React from "react";
import * as React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import ListSettings from "../../components/listSettings";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorageConfig from "../../components/storageConfig";

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
}) => {
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
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
