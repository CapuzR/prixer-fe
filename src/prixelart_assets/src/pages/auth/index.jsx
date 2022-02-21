import React, { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AddBoxIcon from "@mui/icons-material/AddBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const toolbarHeight = 68;

function Auth() {
  const [isWalletAuth, setIsWalletAuth] = useState(
    Boolean(localStorage.getItem("isWalletAuth"))
  );
  const [isUserData, setIsUserData] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {!isWalletAuth && (
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1644256086122-7988468e2545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTE5NzQxNg&ixlib=rb-1.2.1&q=80&w=1080')",
            height: "100vh",
            backgroundSize: "cover",
          }}
        >
          <MuiAppBar
            position="fixed"
            style={{ background: "transparent", height: toolbarHeight }}
          >
            <Toolbar>
              <img src={""} alt="logo" />
            </Toolbar>
          </MuiAppBar>
          <Box style={{ paddingTop: toolbarHeight }}>
            <Box
              style={{
                height: `calc(100vh - ${toolbarHeight}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                style={{ textTransform: "capitalize" }}
                onClick={onConnectWallet}
              >
                Connect stoic
              </Button>
            </Box>
          </Box>
        </div>
      )}
      {isWalletAuth && (
        <div>
          <MuiAppBar style={{ height: toolbarHeight }} position="fixed">
            <Toolbar>
              <img src={""} alt="logo" />
              <IconButton
                style={{ color: "white", marginLeft: "auto" }}
                onClick={onLogout}
              >
                <ExitToAppIcon style={{ color: "white" }} />
              </IconButton>
            </Toolbar>
          </MuiAppBar>
          <Box style={{ paddingTop: toolbarHeight }}>
            <Box style={{ padding: "32px", paddingTop: "16px" }}>
              <Typography variant="h4">Welcome!</Typography>
              <Paper elevation={3} style={{ padding: "24px" }}>
                {!isUserData ? (
                  <>
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                      <IconButton component="label">
                        <Avatar style={{ width: "120px", height: "120px" }} />
                        <input hidden type="file" />
                      </IconButton>
                    </Box>
                    <Grid container spacing={1} style={{ marginTop: "32px" }}>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Username"
                          variant="outlined"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Display name"
                          variant="outlined"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Given name"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Family name"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          type="text"
                          label="Location"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Email"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Phone"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="About"
                          variant="outlined"
                          multiline
                          rows={3}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="h5">Cameras</Typography>
                      <TextField
                        fullWidth
                        type="text"
                        label="Camera"
                        variant="outlined"
                        style={{ marginTop: "12px" }}
                      />
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
                      <IconButton size="large" color="primary">
                        <AddBoxIcon fontSize="large" color="primary" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="h5">Lenses</Typography>
                      <TextField
                        fullWidth
                        type="text"
                        label="Lenses"
                        variant="outlined"
                        style={{ marginTop: "12px" }}
                      />
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
                      <IconButton size="large" color="primary">
                        <AddBoxIcon fontSize="large" color="primary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}

                <Box
                  style={{
                    marginTop: "32px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      marginRight: "4px",
                      textTransform: "capitalize",
                      fontSize: "12px",
                      background: isUserData && "white",
                      color: isUserData && "black",
                    }}
                    onClick={() => onHandleScreem(false)}
                    fullWidth
                  >
                    Basics
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      background: !isUserData && "white",
                      color: !isUserData && "black",
                    }}
                    onClick={() => onHandleScreem(true)}
                  >
                    Cameras & Lenses
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "absolute", bottom: 16, right: 16 }}
            onClick={() => {
              navigate("/main");
              localStorage.setItem("isAuth", true);
            }}
          >
            <ChevronRightIcon />
          </Fab>
        </div>
      )}
    </div>
  );

  function onConnectWallet() {
    localStorage.setItem("isWalletAuth", true);
    setIsWalletAuth(true);
  }

  function onHandleScreem(screen) {
    setIsUserData(screen);
  }

  function onLogout() {
    localStorage.removeItem("isWalletAuth");
    localStorage.removeItem("isAuth");
    setIsWalletAuth(false);
    setIsUserData(false);
  }
}

export default Auth;
