import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import ServiceForm from "../../components/serviceForm";

const MobileView = ({
  onLogout,
  username,
  isMobile,
  createCollection,
  createInvoice,
  transfer,
  verifyPayment,
  invoice,
  isLoading,
  setIsLoading,
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
            <ServiceForm
              isMobile={isMobile}
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

      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
