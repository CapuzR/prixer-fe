import React, { useState } from "react";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import service from "../service";
import Navbar from "../../components/navbar";
import consts from "../../consts/index";
import Sidebar from "../../components/sidebar";

function SettingsStorage({ window }) {
  const [isOpenSideMenu, setIsOpenSideManu] = useState(false);
  const [isAddStorage, setIsAddStorage] = useState(false);
  const [unit, setUnit] = useState("");
  const toolbarHeight = 68;
  const drawerwidth = isOpenSideMenu ? 240 : 80;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar
        onLogout={onLogout}
        toolbarHeight={toolbarHeight}
        mobileBreakpoint={mobileBreakpoint}
      />
      <Sidebar
        drawerwidth={drawerwidth}
        handleDrawerToggle={handleDrawerToggle}
        container={container}
        isOpenSideMenu={isOpenSideMenu}
        setIsOpenSideManu={setIsOpenSideManu}
      />

      <Box
        style={{
          paddingTop: toolbarHeight + 24,
          maxWidth: 1000,
          margin: "auto",
        }}
      >
        {isAddStorage ? (
          <>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="primary"
                onClick={() => setIsAddStorage(false)}
              >
                <ArrowBackIcon fontSize="medium" />
              </IconButton>

              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  width: "-webkit-fill-available",
                }}
              >
                Setup your storage
              </Typography>
              <Button
                style={{
                  marginLeft: "auto",
                  color: "#5DBB63",
                }}
                onClick={() => {
                  alert("create storage");
                }}
              >
                CREATE
              </Button>
            </Box>
            <Grid container spacing={1}>
              <Paper
                elevation={3}
                style={{
                  padding: "24px 24px 24px 24px",
                  marginTop: 14,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                      <Typography variant="h6">
                        Choose your storage units
                      </Typography>
                    </div>
                    <div>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                      >
                        <InputLabel id="type-label">Units</InputLabel>
                        <Select
                          labelId="type-label"
                          id="type-label-select"
                          label="units"
                          value={unit}
                          onChange={(event) => setUnit(event.target.value)}
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
            </Grid>
          </>
        ) : (
          <>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="primary"
                onClick={() => navigate(-1)}
                style={{ position: "absolute" }}
              >
                <ArrowBackIcon fontSize="medium" />
              </IconButton>
              <Typography
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margiBottom: 8,
                  width: "100%",
                  textAlign: "center",
                }}
                variant="h6"
              >
                Storages
              </Typography>
              <Button
                onClick={() => setIsAddStorage(true)}
                style={{
                  marginLeft: "auto",
                  color: "#5DBB63",
                }}
              >
                Add
              </Button>
            </Box>
            <TableContainer component={Paper} style={{ marginTop: 16 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Canister ID</TableCell>
                    <TableCell align="center">Size (MB)</TableCell>
                    <TableCell align="center">Assets</TableCell>
                    <TableCell align="center">Cycles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      id: "ID 1",
                      size: "3.2",
                      assets: "10/10",
                      cycles: "12500/1000000",
                    },
                    {
                      id: "ID 2",
                      size: "1.5",
                      assets: "10/10",
                      cycles: "90000/1000000",
                    },
                    {
                      id: "ID 3",
                      size: "5",
                      assets: "7/10",
                      cycles: "1752220/1000000",
                    },
                    {
                      id: "ID 4",
                      size: "8",
                      assets: "0/10",
                      cycles: "0/1000000",
                    },
                  ].map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.size}</TableCell>
                      <TableCell align="center">{row.assets}</TableCell>
                      <TableCell align="center">{row.cycles}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </div>
  );

  function handleDrawerToggle() {
    setIsOpenSideManu(!isOpenSideMenu);
  }

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }
}

export default SettingsStorage;
