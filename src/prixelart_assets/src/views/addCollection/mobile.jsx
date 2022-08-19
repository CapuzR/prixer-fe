import React, { useContext } from "react";
import * as React from "react";
import { Box } from "@mui/material";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import CollectionForm from "../../components/collectionForm";

const MobileView = ({
  onLogout,
  username,
  isMobile,
  createCollection,
  createInvoice,
  transfer,
  verifyPayment,
  invoice,
}) => {
  const isConfirmPayment = async () => {
    const transferResponse = await transfer(
      invoice.subAccount,
      parseInt(invoice.invoice.amount)
    );
    if (transferResponse) {
      await verifyPayment(invoice.invoice.id);
    } else {
      setIsOpen(false);
    }
  };

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
              createInvoice={createInvoice}
              transfer={transfer}
              verifyPayment={verifyPayment}
              invoice={invoice}
            />
          </Box>
        </Box>
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
