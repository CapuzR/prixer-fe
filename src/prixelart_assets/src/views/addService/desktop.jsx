import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";

const Desktop = ({
  onLogout,
  username,
  isOpenSidebar,
  isMobile,
  handleSidebar,
  window,
  fullName,
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />

      <Sidebar
        drawerwidth={isOpenSidebar ? 240 : 80}
        container={container}
        isOpenSideMenu={isOpenSidebar}
        handleSidebar={handleSidebar}
        username={username}
        fullName={fullName}
      />

      <ActionButton />
    </Box>
  );
};

export default Desktop;
