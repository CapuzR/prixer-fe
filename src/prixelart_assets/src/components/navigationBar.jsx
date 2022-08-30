import React from "react";
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import ActionButton from "./actionButton";

function NavigationBar({ username, isLoading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  return (
    <Paper
      elevation={5}
      style={{
        height: 60,
        backgroundColor: "#FFFFFF",
        width: "100%",
        bottom: 0,
        position: "fixed",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton
          disabled={isLoading}
          onClick={() => navigate("/feed")}
          style={{
            color: location.pathname === "/feed" ? "#2D2D2D" : "#C5C5C5",
          }}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton color="primary" disabled={isLoading}>
          <Typography
            style={{
              fontSize: 32,

              fontWeight: "bold",
            }}
          >
            <IconButton disabled={true} color="primary">
              <StarIcon fontSize="large" />
            </IconButton>
          </Typography>
        </IconButton>
      </Box>
      <Box
        style={{
          width: "20%",
          textAlign: "center",
          marginTop: -45,
        }}
      >
        <ActionButton isMobile={true} isLoading={isLoading} />
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton
          disabled={isLoading}
          onClick={() => navigate("/explore")}
          color="primary"
          style={{
            color: location.pathname === "/explore" ? "#2D2D2D" : "#C5C5C5",
          }}
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box style={{ width: "20%", textAlign: "center" }}>
        <IconButton
          disabled={isLoading}
          style={{
            color:
              location.pathname.split("/")[1] === "u" ? "#2D2D2D" : "#C5C5C5",
          }}
          color="primary"
          onClick={() => {
            if (params === username) {
              return false;
            } else {
              navigate(`/u/${username}`);
            }
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default NavigationBar;
