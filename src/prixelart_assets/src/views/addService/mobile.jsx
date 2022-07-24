import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";

const MobileView = ({ onLogout, username, isMobile }) => {
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />

      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
