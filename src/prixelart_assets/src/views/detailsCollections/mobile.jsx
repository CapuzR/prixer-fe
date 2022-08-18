import React from "react";
import * as React from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";

const MobileView = ({
  onLogout,
  username,
  isMobile,
  collection,
  handleView,
  isMint,
  mintNFT,
}) => {
  const navigate = useNavigate();
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Box
        style={{
          marginTop: 70,
          paddingBottom: 60,
        }}
      >
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

              width: "100%",
            }}
          >
            <Typography
              style={{ margin: "auto" }}
              variant={isMobile ? "h5" : "h4"}
            >
              {`Collection ${collection.name}`}
            </Typography>
          </Box>
          <Box style={{ marginLeft: "auto" }}>
            <Button
              style={{
                color: "#5DBB63",
              }}
              onClick={() => handleView(true)}
            >
              Mint
            </Button>
          </Box>
        </Box>
        <Box style={{ padding: 8 }}>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Typography
              onClick={(event) => console.log(event)}
              variant="h6"
              className="mint-hl"
              style={{ textDecoration: "underline" }}
            >{`NFTs`}</Typography>
          </div>
          <Grid container spacing={1} style={{ maxWidth: 1000 }}>
            {[1, 2, 3, 4, 5].map((nft, index) => (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={3} key={index}>
                <Card>
                  <CardMedia
                    // onClick={() =>
                    //   navigate(`/gallery/${item.id}/posts/${username}`)
                    // }
                    component="img"
                    height="180"
                    image={
                      "https://images.unsplash.com/photo-1653287606739-087b7e6a0843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NDEzNTk4Mg&ixlib=rb-1.2.1&q=80&w=1080"
                    }
                    alt="image"
                  />
                  <CardContent>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h6" component="div">
                        Titulo
                      </Typography>
                      {/* <IconButton
                        color="primary"
                        style={{ marginLeft: "auto" }}
                      >
                        <MoreHorizIcon />
                      </IconButton> */}
                    </Box>
                    <Box style={{ display: "flex", marginTop: 18 }}>
                      <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </Typography>
                    </Box>

                    <Box
                      style={{
                        marginTop: 16,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        style={{
                          textTransform: "capitalize",
                          borderRadius: 10,
                        }}
                        variant="contained"
                      >
                        Buy
                      </Button>
                      <Typography
                        style={{ marginLeft: "auto" }}
                        variant="body2"
                      >
                        130 ICP
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <NavigationBar username={username} />
    </Box>
  );
};

export default MobileView;
