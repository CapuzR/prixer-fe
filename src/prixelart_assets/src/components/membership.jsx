import React from "react";
import * as React from "react";

import { Box, Typography, Paper, Grid } from "@mui/material";
function Membership({ isMobile, onAcceptmembership }) {
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
            Membership
          </Typography>
        </Box>
      </Box>
      <Box style={{ marginTop: 24, textAlign: "center" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper
              className="membership-paper"
              elevation={2}
              style={{
                minHeight: isMobile ? 250 : 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onAcceptmembership("free")}
            >
              <Box>
                <Typography variant="h5">SOCIAL</Typography>
                <Typography variant="title">
                  Able to post with thumbnails
                </Typography>
                <Typography>Free</Typography>
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
                minHeight: isMobile ? 250 : 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#2D2D2D",
              }}
              onClick={() => onAcceptmembership("premium")}
            >
              <Box>
                <Typography variant="h5" style={{ color: "#FFFFFF" }}>
                  SOCIAL + OWN
                </Typography>
                <Typography variant="title" style={{ color: "#FFFFFF" }}>
                  Able to store and own my photos
                </Typography>
                <Typography style={{ color: "#FFFFFF" }}>$7/GB Year</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Membership;
