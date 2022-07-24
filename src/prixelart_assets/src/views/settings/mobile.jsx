import React from "react";
import * as React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import ListSettings from "../../components/listSettings";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MobileView = ({
  onLogout,

  username,
  isMobile,
  handleNavigation,
}) => {
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
              color="primary"
              onClick={() => handleNavigation(-1)}
              style={{ position: "absolute" }}
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
          <ListSettings isMobile={isMobile} />
        </Box>
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
