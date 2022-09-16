import React, { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Grid,
  TextField,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ServiceForm = ({
  isMobile,
  createInvoice,
  transfer,
  verifyPayment,
  invoice,
  isLoading,
  setIsLoading,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState(0);
  const [website, setWebsite] = useState("");
  const [prixelart, setPrixelart] = useState("");
  const [valueCollection, setValueCollection] = useState(0);
  const [amount, setAmount] = useState(4);

  const [isOpen, setIsOpen] = useState(false);
  const isConfirmPayment = async () => {
    setIsLoading(true);
    const transferResponse = await transfer(
      invoice.subAccount,
      parseInt(invoice.invoice.amount)
    );
    if (transferResponse) {
      await verifyPayment(
        invoice.invoice.id,
        name,
        symbol,
        supply,
        website,
        prixelart,
        valueCollection
      );
    } else {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Box style={{ padding: 12 }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <IconButton
            disabled={isLoading}
            color="primary"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography style={{}} variant={isMobile ? "h5" : "h4"}>
              Add service
            </Typography>
          </Box>
          <Box style={{ marginLeft: "auto" }}>
            <Button
              disabled={
                !name ||
                !supply ||
                !symbol ||
                !website ||
                !prixelart ||
                isLoading
              }
              style={{
                color:
                  !name ||
                  !supply ||
                  !symbol ||
                  !website ||
                  !prixelart ||
                  isLoading
                    ? "#C5C5C5"
                    : "#5DBB63",
              }}
              onClick={() =>
                Promise.resolve(
                  createInvoice(amount * 100000000, parseInt(valueCollection))
                )
                  .then(() => setIsOpen(true))
                  .catch(console.log)
              }
            >
              Add
            </Button>
          </Box>
        </Box>
        <Paper elevation={1} style={{ padding: 24 }}>
          <Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <IconButton component="label">
                <Avatar style={{ width: "120px", height: "120px" }} />
                <input hidden type="file" />
              </IconButton>
            </Box>
            <Grid container spacing={2} style={{ marginTop: "32px" }}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Symbol"
                  variant="outlined"
                  required
                  fullWidth
                  value={symbol}
                  onChange={(event) => setSymbol(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  disabled={isLoading}
                  type="number"
                  label="Value"
                  variant="outlined"
                  required
                  fullWidth
                  value={valueCollection}
                  onChange={(event) => setValueCollection(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  disabled={isLoading}
                  type="number"
                  label="Supplay"
                  variant="outlined"
                  required
                  fullWidth
                  value={supply}
                  onChange={(event) => setSupply(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Website"
                  variant="outlined"
                  required
                  fullWidth
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Prixelart"
                  variant="outlined"
                  required
                  fullWidth
                  value={prixelart}
                  onChange={(event) => setPrixelart(event.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      {invoice && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Payment confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box>{`
                Do you want to confirm the payment for the amount ${
                  parseInt(invoice.invoice.amount) / 100000000
                } of ICP?`}</Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled={isLoading} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => isConfirmPayment()}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ServiceForm;
