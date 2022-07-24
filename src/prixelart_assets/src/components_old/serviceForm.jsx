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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ServiceForm({ navigate, isUpdate, setIsUpdateService }) {
  return (
    <Box style={{ padding: 24, maxWidth: 1000, margin: "auto" }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="primary"
          onClick={() => (isUpdate ? setIsUpdateService(false) : navigate(-1))}
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Typography
          style={{ textAlign: "center", width: "-webkit-fill-available" }}
          variant="h6"
        >
          {isUpdate ? "Update service" : "New service"}
        </Typography>
        <Button style={{ marginLeft: "auto", color: "#5DBB63" }}>
          {" "}
          {isUpdate ? "UPDATE" : "ADD"}
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
                // disabled={isLoading}
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 4 }}
                // value={titleGallery}
                // onChange={(event) => setTitleGallery(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                // disabled={isLoading}
                type="text"
                label="Description"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 4 }}
                multiline
                rows={3}
                // value={aboutGallery}
                // onChange={(event) => setAboutGallery(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControl style={{ marginBottom: 4 }} fullWidth>
                <InputLabel id="gallery-label">Working hours</InputLabel>
                <Select
                  labelId="gallery-label"
                  id="gallery-select"
                  label="Working hours"
                >
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((hour) => (
                    <MenuItem index={hour}>{hour}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}

export default ServiceForm;
