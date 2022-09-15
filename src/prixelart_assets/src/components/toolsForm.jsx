import React, { useState } from "react";
import * as React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Chip,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";

function ToolsForm({
  tools = [
    {
      id: 1,
      name: "Lente 1 de prueba",
      description: "Prueba description",
      category: "lens",
    },
    {
      id: 2,
      name: "Lente 2 de prueba",
      description: "Prueba description",
      category: "lens",
    },
    {
      id: 3,
      name: "Camera 1 de prueba",
      description: "Prueba description",
      category: "camera",
    },
    {
      id: 4,
      name: "Camera 2 de prueba",
      description: "Prueba description",
      category: "camera",
    },
  ],
  camera,
  setCamera,
  lens,
  setLens,
  selectedCameras,
  setSelectedCameras,
  selectedLens,
  setSelectedLens,
  isLoadig,
}) {
  const addCameras = (id) => {
    const tool = tools.find((tl) => tl.id === id);

    if (selectedCameras.find((tl) => tl === tool.name)) {
      alert("Camera already exist");
    } else {
      setSelectedCameras([...selectedCameras, tool.name]);
    }
  };
  const addLens = (id) => {
    const tool = tools.find((tl) => tl.id === id);

    if (selectedLens.find((tl) => tl === tool.name)) {
      alert("Lens already exist");
    } else {
      setSelectedLens([...selectedLens, tool.name]);
    }
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">Cameras</Typography>
          <FormControl style={{ marginBottom: 4 }} required fullWidth>
            <Select
              disabled={isLoadig}
              required
              labelId="camera-label"
              id="camera-label-select"
              value={camera}
              onChange={(event) => setCamera(event.target.value)}
            >
              {tools.map(
                (type) =>
                  type.category === "camera" && (
                    <MenuItem value={type.id} key={type.id}>
                      {type.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
          <Box style={{ marginTop: "8px" }}>
            {selectedCameras.map((item, index) => (
              <Chip
                label={item}
                variant="outlined"
                style={{ marginBottom: "8px" }}
                key={index}
                disabled={isLoadig}
                onDelete={() => {
                  setSelectedCameras(
                    selectedCameras.filter((tl) => tl !== item)
                  );
                }}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ justifyContent: "center", display: "flex" }}
        >
          <IconButton
            size="large"
            color="primary"
            disabled={isLoadig}
            onClick={() => addCameras(camera)}
          >
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">Lenses</Typography>
          <FormControl
            // disabled={isLoading}
            style={{ marginBottom: 4 }}
            required
            fullWidth
          >
            <Select
              labelId="lenses-label"
              id="lenses-label-select"
              disabled={isLoadig}
              value={lens}
              onChange={(event) => setLens(event.target.value)}
            >
              {tools.map(
                (type) =>
                  type.category === "lens" && (
                    <MenuItem value={type.id} key={type.id}>
                      {type.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
          <Box style={{ marginTop: "8px" }}>
            {selectedLens.map((tool, index) => (
              <Chip
                label={tool}
                style={{ marginBottom: "8px" }}
                variant="outlined"
                key={index}
                disabled={isLoadig}
                onDelete={() => {
                  1;
                  1;

                  setSelectedLens(selectedLens.filter((tl) => tl !== tool));
                }}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ justifyContent: "center", display: "flex" }}
        >
          <IconButton
            disabled={isLoadig}
            size="large"
            onClick={() => addLens(lens)}
            color="primary"
          >
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

export default ToolsForm;
