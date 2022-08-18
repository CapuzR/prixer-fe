import React, { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CollectionForm = ({ isMobile, createCollection }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState(0);
  const [website, setWebsite] = useState("");
  const [prixelart, setPrixelart] = useState("");
  console.log(prixelart);
  return (
    <>
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
            <Typography style={{}} variant={isMobile ? "h5" : "h4"}>
              Add collection
            </Typography>
          </Box>
          <Box style={{ marginLeft: "auto" }}>
            <Button
              disabled={!name || !supply || !symbol || !website || !prixelart}
              style={{
                color:
                  !name || !supply || !symbol || !website || !prixelart
                    ? "#C5C5C5"
                    : "#5DBB63",
              }}
              onClick={() =>
                createCollection(name, symbol, supply, website, prixelart)
              }
            >
              Add
            </Button>
          </Box>
        </Box>
        <Paper elevation={1} style={{ padding: 24 }}>
          <Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <IconButton component="label">
                <Avatar style={{ width: "120px", height: "120px" }} />
                <input hidden type="file" />
              </IconButton>
            </Box>
            <Grid container spacing={2} style={{ marginTop: "32px" }}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  type="text"
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  type="text"
                  label="Symbol"
                  variant="outlined"
                  required
                  fullWidth
                  value={symbol}
                  onChange={(event) => setSymbol(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  type="number"
                  label="Supplay"
                  variant="outlined"
                  required
                  fullWidth
                  value={supply}
                  onChange={(event) => setSupply(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  type="text"
                  label="Website"
                  variant="outlined"
                  required
                  fullWidth
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextField
                  type="text"
                  label="Prixelart"
                  variant="outlined"
                  required
                  fullWidth
                  value={prixelart}
                  onChange={(event) => setPrixelart(event.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default CollectionForm;
