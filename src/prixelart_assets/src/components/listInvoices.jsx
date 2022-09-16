import React, { useState } from "react";
import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function ListInvoices({ priInvoice = [], invoicesSub = [] }) {
  const [type, setType] = useState("principal");

  return (
    <TableContainer component={Paper}>
      <Button
        variant="contained"
        onClick={() => setType(type === "principal" ? "private" : "principal")}
      >
        {type === "principal"
          ? "Show privates invoices"
          : "Show subscription invoices"}
      </Button>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        style={{ marginLeft: 14, marginTop: 14 }}
      >
        {type === "principal"
          ? "Subscription Invoices"
          : "Private Canister Invoices"}
      </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Invoice ID</TableCell>
            <TableCell>Creator</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Destination (subAccount)</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {type === "principal"
            ? invoicesSub.map((item) => (
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    {Number(item[1].id)}
                  </TableCell>
                  <TableCell>{item[1].creator.toText()}</TableCell>
                  <TableCell>{Number(item[1].amount) / 100000000}</TableCell>
                  <TableCell>{item[1].destination}</TableCell>
                  <TableCell>{item[1].token}</TableCell>
                </TableRow>
              ))
            : priInvoice.map((item) => (
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    {Number(item[1].id)}
                  </TableCell>
                  <TableCell>{item[1].creator.toText()}</TableCell>
                  <TableCell>{Number(item[1].amount) / 100000000}</TableCell>
                  <TableCell>{item[1].destination}</TableCell>
                  <TableCell>{item[1].token}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListInvoices;
