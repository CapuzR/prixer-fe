import React, { useState } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

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
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box style={{ padding: 24 }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">Create Gallery</Typography>

        <IconButton
          color="primary"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "auto" }}
        >
          <ArrowCircleLeftOutlinedIcon fontSize="large" />
        </IconButton>
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
                label="title"
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
                label="About the gallery"
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
          <Box style={{ marginTop: 12 }}>
            <Button
              variant="outlined"
              disabled={!titleGallery || !aboutGallery || isLoading}
              onClick={async () => {
                setIsLoading(true);
                await service.createGallery({
                  artistPpal: JSON.parse(localStorage.getItem("_scApp"))
                    .principal,
                  description: aboutGallery,
                  galleryBanner: ["Banner"],
                  name: titleGallery,
                });
                setIsLoading(false);
                navigate("/main");
              }}
            >
              {isLoading ? <CircularProgress size={32} /> : "Create"}
            </Button>
          </Box>
          <Box
            style={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "center",
            }}
          ></Box>
        </Paper>
      </Grid>
    </Box>
  );
}

export default GalleryForm;
