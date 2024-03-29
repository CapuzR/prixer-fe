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

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Navbar from "../../components_old/navbar";
import Sidebar from "../../components_old/sidebar";

function SettingsNFTS() {
  const [isOpenSideMenu, setIsOpenSideManu] = useState(false);
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
            Collections
            {/* {galleries?.find((gallery) => gallery.id === galleryId)?.name} */}
          </Typography>
        </Box>
        <TableContainer component={Paper} style={{ marginTop: 16 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Canister ID</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Size (MB)</TableCell>
                <TableCell align="center">Assets</TableCell>
                <TableCell align="center">Cycles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                {
                  id: "ID 1",
                  type: "type",
                  size: "3.2",
                  assets: "10/10",
                  cycles: "12500/1000000",
                },
                {
                  id: "ID 2",
                  type: "type",
                  size: "1.5",
                  assets: "10/10",
                  cycles: "90000/1000000",
                },
                {
                  id: "ID 3",
                  type: "type",
                  size: "5",
                  assets: "7/10",
                  cycles: "1752220/1000000",
                },
                {
                  id: "ID 4",
                  type: "type",
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
                  <TableCell align="center">{row.type}</TableCell>

                  <TableCell align="center">{row.size}</TableCell>
                  <TableCell align="center">{row.assets}</TableCell>
                  <TableCell align="center">{row.cycles}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default SettingsNFTS;
