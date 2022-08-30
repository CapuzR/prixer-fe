import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
import GalleryForm from "../../components/galleryForm";

const Desktop = ({
  onLogout,
  username,
  isOpenSidebar,
  isMobile,
  handleSidebar,
  window,
  fullName,
  createGallery,

  isLoading,
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
        isLoading={isLoading}
      />
      <Box
        style={{
          marginTop: 60,
        }}
      >
        <Box
          style={{ maxWidth: 1000, marginLeft: "auto", marginRight: "auto" }}
        >
          <Box style={{ textAlign: "center" }}>
            <GalleryForm
              isMobile={isMobile}
              createGallery={createGallery}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
      <ActionButton isLoading={isLoading} />
    </Box>
  );
};

export default Desktop;
