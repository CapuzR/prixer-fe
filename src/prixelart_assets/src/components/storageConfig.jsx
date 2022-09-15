import React, { useState } from "react";
import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

function StorageConfig({
  isMobile,
  onSetupStorageUnits,
  isLoading,
  invoice,
  transfer,
  verifyPayment,
  setIsLoading,
}) {
  const [amount, setAmount] = useState(4);
  const [quantity, setQuantity] = useState(1);

  const [isOpen, setIsOpen] = useState(false);

  const isConfirmPayment = async () => {
    setIsLoading(true);
    const transferResponse = await transfer(
      invoice.subAccount,
      parseInt(invoice.invoice.amount)
    );
    if (transferResponse) {
      await verifyPayment(invoice.invoice.id);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
    setIsLoading(false);
  };
  return (
    <Box style={{ padding: 12 }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Box>
          <Typography
            style={{
              display: "flex",
            }}
            variant={isMobile ? "h5" : "h4"}
          >
            Setup storage units
          </Typography>
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <Button
            disabled={isLoading}
            onClick={() =>
              Promise.resolve(onSetupStorageUnits(amount * 100000000, quantity))
                .then(() => setIsOpen(true))
                .catch(console.log)
            }
            style={{
              color: "#5DBB63",
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Paper elevation={1} style={{ padding: "24px" }}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ marginBottom: 32 }}
          >
            <div style={{ marginBottom: 8 }}>
              <Typography variant="h6">Choose your storage units</Typography>
            </div>
            <div>
              <FormControl style={{ marginBottom: 4 }} required fullWidth>
                <InputLabel id="type-label">Units</InputLabel>
                <Select
                  disabled={isLoading}
                  labelId="type-label"
                  id="type-label-select"
                  label="units"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                    setQuantity(event.target.value === 4 ? 1 : 2);
                  }}
                >
                  {[
                    { id: 1, name: "1 unit: $6 GB", value: 4, quantity: 1 },
                    { id: 2, name: "2 units: $12 GB", value: 8, quantity: 2 },
                  ].map((type) => (
                    <MenuItem value={type.value} key={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div style={{ marginBottom: 8 }}>
              <Typography variant="h6">
                Include principals to control your storage
              </Typography>
            </div>
            <div>
              <TextField
                disabled={isLoading}
                fullWidth
                type="text"
                label="Principals"
                variant="outlined"
                multiline
                rows={5}
                // value={about}
                required
                // onChange={(event) => setAbout(event.target.value)}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
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
    </Box>
  );
}

export default StorageConfig;
