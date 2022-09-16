import React, { useState } from "react";
import * as React from "react";

import {
  Box,
  Paper,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import InfoIcon from "@mui/icons-material/Info";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PaymentIcon from "@mui/icons-material/Payment";

const ListSettings = ({
  isMobile,
  handleScreen,
  isLoading,
  createInvoice,
  invoice,
  verifyPaymentWH,
  artist,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [valueCollection, setValueCollection] = useState(0);

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleScreen("list_storage")}
          >
            <Box style={{ textAlign: "center" }}>
              <Typography variant="h5">
                <StorageIcon style={{ fontSize: 64 }} />
              </Typography>
              <Typography variant="title">Storage</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ marginTop: isMobile && 12 }}
        >
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h5">
                  <VpnKeyIcon style={{ fontSize: 64 }} />
                </Typography>
                <Typography variant="title">Security</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setIsOpen(true)}
          >
            <Box>
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h5">
                  <QueryBuilderIcon style={{ fontSize: 64 }} />
                </Typography>
                <Typography variant="title">Working hours</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleScreen("payment_history")}
          >
            <Box>
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h5">
                  <PaymentIcon style={{ fontSize: 64 }} />
                </Typography>
                <Typography variant="title">Payment history</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ marginTop: isMobile && 12 }}
        >
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box style={{ textAlign: "center" }}>
              <Typography variant="h5">
                <InfoIcon style={{ fontSize: 64 }} />
              </Typography>
              <Typography variant="title">About PrixerW3</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!artist.canisterId ? "Info!" : "Confirm!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              {!artist.canisterId
                ? "You must generate a private canister"
                : `Would you like to start selling your Working Hours?`}
            </Box>
            <Box>
              {!artist.canisterId
                ? "You must generate a canister from the storage section"
                : `(In this first version, you can only mint 2 working hours)`}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {artist.canisterId && (
            <Button disabled={isLoading} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          )}
          <Button
            disabled={isLoading}
            onClick={() =>
              artist.canisterId
                ? Promise.resolve(createInvoice(2 * 100000000, 1))
                    .then(() => setIsOpen(false))
                    .then(() => setIsOpenConfirm(true))
                    .catch(console.log)
                : setIsOpen(false)
            }
            autoFocus
          >
            Go
          </Button>
        </DialogActions>
      </Dialog>
      {invoice && (
        <Dialog
          open={isOpenConfirm}
          onClose={() => setIsOpenConfirm(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Payment confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box>{`
              Define your Working Hour price and then confirm that you are paying ${
                parseInt(invoice.invoice.amount) / 100000000
              } ICP for the canister creation
       `}</Box>
              <Box>
                <TextField
                  type="number"
                  value={valueCollection}
                  onChange={(e) => setValueCollection(e.target.value)}
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isLoading}
              onClick={() => setIsOpenConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() =>
                verifyPaymentWH(invoice.invoice.id, valueCollection)
              }
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ListSettings;
