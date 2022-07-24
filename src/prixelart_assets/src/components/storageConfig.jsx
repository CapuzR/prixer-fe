import React from "react";
import * as React from "react";

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

function StorageConfig({ isMobile, onSetupStorageUnits }) {
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
            onClick={() => onSetupStorageUnits()}
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
                  labelId="type-label"
                  id="type-label-select"
                  label="units"
                  //   value={unit}
                  //   onChange={(event) => setUnit(event.target.value)}
                >
                  {[
                    { id: 1, name: "1 unit: $6 GB" },
                    { id: 2, name: "2 units: $12 GB" },
                  ].map((type) => (
                    <MenuItem value={type.name} key={type.id}>
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
    </Box>
  );
}

export default StorageConfig;
