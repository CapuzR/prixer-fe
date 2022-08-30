import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import GalleryForm from "../../components/galleryForm";

const MobileView = ({
  onLogout,
  username,
  isMobile,
  createGallery,
  isLoading,
}) => {
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Box
        style={{
          marginTop: 60,
        }}
      >
        <Box style={{ maxWidth: 1000 }}>
          <Box style={{ textAlign: "center" }}>
            <GalleryForm
              isMobile={isMobile}
              createGallery={createGallery}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
      <NavigationBar username={username} isLoading={isLoading} />
    </Box>
  );
};

export default MobileView;
