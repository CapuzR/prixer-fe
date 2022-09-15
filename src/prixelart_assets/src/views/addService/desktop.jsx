import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
import ServiceForm from "../../components/serviceForm";

const Desktop = ({
  onLogout,
  username,
  isOpenSidebar,

  handleSidebar,
  window,
  fullName,
  createCollection,
  createInvoice,
  transfer,
  verifyPayment,
  invoice,
  isLoading,
  setIsLoading,
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
      <Box
        style={{
          marginTop: 60,
        }}
      >
        <Box
          style={{ maxWidth: 1000, marginLeft: "auto", marginRight: "auto" }}
        >
          <Box style={{ textAlign: "center" }}>
            <ServiceForm
              createCollection={createCollection}
              createInvoice={createInvoice}
              transfer={transfer}
              verifyPayment={verifyPayment}
              invoice={invoice}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Box>
        </Box>
      </Box>

      <ActionButton />
    </Box>
  );
};

export default Desktop;
