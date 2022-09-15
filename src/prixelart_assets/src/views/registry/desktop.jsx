import React from "react";
import * as React from "react";
import { Box } from "@mui/material";
import Navbar from "../../components/navbar";
import consts from "../../consts";
import RegistryForm from "../../components/registryForm";
import Membership from "../../components/membership";
import StorageConfig from "../../components/storageConfig";
import PostForm from "../../components/postForm";

const DesktopView = ({
  onLogout,
  screen,
  isMobile,
  createArtist,
  onAcceptmembership,
  onSetupStorageUnits,
  artist,
  onSkip,
  createPost,
  createInvoice,
  invoice,
  transfer,
  verifyPayment,
  isLoading,
}) => {
  return (
    <Box
      style={{
        height: "calc(100vh - 60px)",
        maxWidth: 1000,
        margin: "auto",
      }}
    >
      <Navbar onLogout={onLogout} />
      <Box style={{ paddingTop: 60 }}>
        {screen === consts.registry_artist_form_view ? (
          <RegistryForm
            isMobile={isMobile}
            createArtist={createArtist}
            isLoading={isLoading}
          />
        ) : screen === consts.registry_payment_form_view ? (
          <Membership
            isMobile={isMobile}
            onAcceptmembership={onAcceptmembership}
          />
        ) : screen === consts.registry_storage_form_view ? (
          <StorageConfig
            isMobile={isMobile}
            onSetupStorageUnits={createInvoice}
            invoice={invoice}
            transfer={transfer}
            verifyPayment={verifyPayment}
            isLoading={isLoading}
          />
        ) : (
          <PostForm
            isMobile={isMobile}
            isFirstArt={true}
            artist={artist}
            onSkip={onSkip}
            createPost={createPost}
          />
        )}
      </Box>
    </Box>
  );
};

export default DesktopView;
