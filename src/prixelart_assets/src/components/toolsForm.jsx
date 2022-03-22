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
  selectedTools,
  addTools,
  setSelectedTools,
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
                  type.category.name === "Camera" && (
                    <MenuItem value={type.id} key={type.id}>
                      {type.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
          <Box style={{ marginTop: "8px" }}>
            {selectedTools?.map(
              (tool) =>
                tool.category.name === "Camera" && (
                  <Chip
                    label={tool.name}
                    variant="outlined"
                    style={{
                      marginBottom: "8px",
                      marginRight: "2px",
                    }}
                    key={tool.id}
                    onDelete={() => {
                      setSelectedTools(
                        selectedTools.filter((tl) => tl.id !== tool.id)
                      );
                    }}
                  />
                )
            )}
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
            onClick={() => addTools(camera)}
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
                  type.category.name === "Lens" && (
                    <MenuItem value={type.id} key={type.id}>
                      {type.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
          <Box style={{ marginTop: "8px" }}>
            {selectedTools?.map(
              (tool) =>
                tool.category.name === "Lens" && (
                  <Chip
                    label={tool.name}
                    style={{
                      marginBottom: "8px",
                      marginRight: "2px",
                    }}
                    variant="outlined"
                    key={tool.id}
                    onDelete={() => {
                      setSelectedTools(
                        selectedTools.filter((tl) => tl.id !== tool.id)
                      );
                    }}
                  />
                )
            )}
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
            onClick={() => addTools(lens)}
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
