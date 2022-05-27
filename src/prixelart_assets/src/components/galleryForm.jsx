import React, { useState, forwardRef } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CircularProgress from "@mui/material/CircularProgress";

function GalleryForm({
  navigate,
  titleGallery,
  setTitleGallery,
  aboutGallery,
  setAboutGallery,
  service,
}) {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box style={{ padding: 24, maxWidth: 1000, margin: "auto" }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <IconButton color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Typography
          style={{ textAlign: "center", width: "-webkit-fill-available" }}
          variant="h6"
        >
          New gallery
        </Typography>
        <Button
          style={{ marginLeft: "auto", color: "#5DBB63" }}
          onClick={async () => {
            if (!titleGallery || !aboutGallery || isLoading) {
              setIsSnackbarOpen(true);
              setSeverity("error");
              setMessage("please complete the form");
            } else {
              service.createGallery({
                artistPpal: JSON.parse(localStorage.getItem("_scApp"))
                  .principal,
                description: aboutGallery,
                galleryBanner: ["Banner"],
                name: titleGallery,
              });
              navigate("/main");
            }
          }}
        >
          Add
        </Button>
      </Box>
      <Grid container spacing={1}>
        <Paper
          elevation={5}
          style={{ padding: 24, marginTop: 24, width: "100%" }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                disabled={isLoading}
                type="text"
                label="Title"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 4 }}
                value={titleGallery}
                onChange={(event) => setTitleGallery(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                disabled={isLoading}
                type="text"
                label="About"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 4 }}
                multiline
                rows={4}
                value={aboutGallery}
                onChange={(event) => setAboutGallery(event.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseSnackbar}
        open={isSnackbarOpen}
        TransitionComponent={SlideTransition}
        style={{ display: isSnackbarOpen ? "flex" : "none" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Box>
  );

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  }
}

export default GalleryForm;
