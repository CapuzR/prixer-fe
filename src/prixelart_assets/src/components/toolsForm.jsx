import React from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";

import AddBoxIcon from "@mui/icons-material/AddBox";

function ToolsForm({
  camera,
  setCamera,
  lens,
  setLens,
  tools,
  selectedCameras,
  addCameras,
  setSelectedCameras,
  selectedLens,
  addLens,
  setSelectedLens,
}) {
  return (
    <>
      <Grid container spacing={1} style={{ marginTop: 24 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">Cameras</Typography>
          <FormControl style={{ marginBottom: 4 }} required fullWidth>
            <Select
              labelId="camera-label"
              id="camera-label-select"
              value={camera}
              onChange={(event) => setCamera(event.target.value)}
            >
              {tools?.map(
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
            {selectedCameras?.map((tool, index) => (
              <Chip
                label={tool}
                variant="outlined"
                style={{
                  marginBottom: "8px",
                  marginRight: "2px",
                }}
                key={index}
                onDelete={() => {
                  setSelectedCameras(
                    selectedCameras.filter((tl) => tl !== tool)
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
            onClick={() => addCameras(camera)}
            size="large"
            color="primary"
          >
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h5">Lenses</Typography>
          <FormControl style={{ marginBottom: 4 }} required fullWidth>
            <Select
              labelId="lenses-label"
              id="lenses-label-select"
              value={lens}
              onChange={(event) => setLens(event.target.value)}
            >
              {tools?.map(
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
            {selectedLens?.map((tool, index) => (
              <Chip
                label={tool}
                style={{
                  marginBottom: "8px",
                  marginRight: "2px",
                }}
                variant="outlined"
                key={index}
                onDelete={() => {
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
            onClick={() => addLens(lens)}
            size="large"
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
