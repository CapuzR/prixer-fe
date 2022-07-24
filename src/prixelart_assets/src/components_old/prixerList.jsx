import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { encode } from "uint8-to-base64";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

function PrixerList({ setShowPrixerList }) {
  return (
    <>
      <Box style={{ padding: 16 }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">Prixers</Typography>

          <IconButton
            color="primary"
            onClick={() => setShowPrixerList(false)}
            style={{ marginLeft: "auto" }}
          >
            <ArrowCircleLeftOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
        <Grid container spacing={1}>
          {[1, 2, 3, 4]?.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg?w=162&auto=format"
                    alt="prixer"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Gleiber Granado
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default PrixerList;
