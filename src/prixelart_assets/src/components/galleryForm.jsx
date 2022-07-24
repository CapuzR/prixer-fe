import React, { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GalleryForm = ({ isMobile, createGallery }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");

  const isDisabled = () => {
    return !title || !about ? true : false;
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
        <IconButton color="primary" onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"}>Add gallery</Typography>
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <Button
            onClick={() =>
              createGallery({
                artistPpal: JSON.parse(localStorage.getItem("_scApp"))
                  .principal,
                description: about,
                galleryBanner: ["Banner"],
                name: title,
              })
            }
            style={{
              color: isDisabled() ? "#C5C5C5" : "#5DBB63",
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Paper
        elevation={5}
        style={{ padding: 24, marginTop: 24, width: "100%" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              //   disabled={isLoading}
              type="text"
              label="Title"
              variant="outlined"
              fullWidth
              style={{ marginBottom: 4 }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              //   disabled={isLoading}
              type="text"
              label="About"
              variant="outlined"
              fullWidth
              style={{ marginBottom: 4 }}
              multiline
              rows={4}
              value={about}
              onChange={(event) => setAbout(event.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default GalleryForm;
