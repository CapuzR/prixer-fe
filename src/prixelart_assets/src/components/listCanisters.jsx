import React, { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ListCanisters({
  artist,
  _canisterContractInfo,
  _assetCanisterContractInfo,
}) {
  const [open, setOpen] = useState(false);
  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        style={{ marginLeft: 14, marginTop: 14 }}
      >
        Private Canister
      </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Canister ID</TableCell>
            <TableCell align="right">Cycles</TableCell>
            <TableCell align="right">Memory size</TableCell>
            <TableCell align="right">Heap size</TableCell>
            <TableCell align="right">Max live size</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell component="th" scope="row">
              {artist.canisterId}
            </TableCell>
            <TableCell align="right">
              {_canisterContractInfo ? _canisterContractInfo.cycles : ""}
            </TableCell>
            <TableCell align="right">
              {_canisterContractInfo ? _canisterContractInfo.memorySize : ""}
            </TableCell>
            <TableCell align="right">
              {_canisterContractInfo ? _canisterContractInfo.heapSize : ""}
            </TableCell>
            <TableCell align="right">
              {_canisterContractInfo ? _canisterContractInfo.maxLiveSize : ""}
            </TableCell>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Assets Canisters
                  </Typography>
                  <Table aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Canister ID</TableCell>
                        <TableCell align="right">Cycles</TableCell>
                        <TableCell align="right">Memory size</TableCell>
                        <TableCell align="right">Heap size</TableCell>
                        <TableCell align="right">Max live size</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {_assetCanisterContractInfo.map((assetCanister) => (
                        <TableRow key={assetCanister.canisterId}>
                          <TableCell component="th" scope="row">
                            {assetCanister.canisterId}
                          </TableCell>
                          <TableCell align="right">
                            {assetCanister ? assetCanister.cycles : ""}
                          </TableCell>
                          <TableCell align="right">
                            {assetCanister ? assetCanister.memorySize : ""}
                          </TableCell>
                          <TableCell align="right">
                            {assetCanister ? assetCanister.heapSize : ""}
                          </TableCell>
                          <TableCell align="right">
                            {assetCanister ? assetCanister.maxLiveSize : ""}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListCanisters;
