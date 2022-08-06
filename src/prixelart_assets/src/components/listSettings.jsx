import React from "react";
import * as React from "react";

import { Box, Paper, Grid, Typography } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import InfoIcon from "@mui/icons-material/Info";

const ListSettings = ({ isMobile, handleScreen }) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleScreen("list_storage")}
          >
            <Box style={{ textAlign: "center" }}>
              <Typography variant="h5">
                <StorageIcon style={{ fontSize: 64 }} />
              </Typography>
              <Typography variant="title">Storage</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ marginTop: isMobile && 12 }}
        >
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "#2D2D2D",
            }}
            //   onClick={() => onAcceptmembership("premium")}
          >
            <Box>
              <Box style={{ textAlign: "center" }}>
                <Typography variant="h5">
                  <VpnKeyIcon style={{ fontSize: 64 }} />
                </Typography>
                <Typography variant="title">Security</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            //   onClick={() => onAcceptmembership("free")}
          >
            <Box>
              <Typography variant="h5">NFT's</Typography>
              {/* <Typography variant="title">
                      A
                    </Typography>
                    <Typography>A</Typography> */}
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ marginTop: isMobile && 12 }}
        >
          <Paper
            className="membership-paper"
            elevation={2}
            style={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "#2D2D2D",
            }}
            //   onClick={() => onAcceptmembership("premium")}
          >
            <Box style={{ textAlign: "center" }}>
              <Typography variant="h5">
                <InfoIcon style={{ fontSize: 64 }} />
              </Typography>
              <Typography variant="title">About PrixerW3</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListSettings;
