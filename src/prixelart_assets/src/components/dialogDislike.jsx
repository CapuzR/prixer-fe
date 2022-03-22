import React from "react";
import * as React from "react";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DialogDislike({ open, setOpen }) {
  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Dislike art"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Why dislike this art?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Disagree</Button>
        <Button onClick={() => setOpen(false)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDislike;
