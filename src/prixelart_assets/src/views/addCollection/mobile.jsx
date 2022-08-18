import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import CollectionForm from "../../components/collectionForm";

const MobileView = ({ onLogout, username, isMobile, createCollection }) => {
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
            <CollectionForm
              isMobile={isMobile}
              createCollection={createCollection}
            />
          </Box>
        </Box>
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
