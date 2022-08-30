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
import CircularProgress from "@mui/material/CircularProgress";

import NavigationBar from "../../components/navigationBar";
import Navbar from "../../components/navbar";
import MintNFTForm from "../../components/mintNFTForm";

const MobileView = ({
  onLogout,
  username,
  isMobile,
  collection,
  handleView,
  isMint,
  mintNFT,
  tokens,
  isLoading,
  onBack,
  isPayment,
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
        {isMint ? (
          <MintNFTForm
            mintNFT={mintNFT}
            onBack={onBack}
            isLoading={isLoading}
          />
        ) : !isPayment && isLoading ? (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 32,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Box style={{ width: isMobile ? "20%" : "10%" }}>
                <IconButton
                  color="primary"
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  <ArrowBackIcon fontSize="medium" />
                </IconButton>
              </Box>

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
              <Box
                style={{ marginLeft: "auto", width: isMobile ? "20%" : "10%" }}
              >
                <Button
                  disabled={isLoading}
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
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Typography
                  onClick={(event) => console.log(event)}
                  variant="h6"
                  className="mint-hl"
                  style={{ textDecoration: "underline" }}
                >{`Publish collection`}</Typography>
              </div>
              <Grid container spacing={1} style={{ maxWidth: 1000 }}>
                {tokens.map((nft, index) => (
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4} key={index}>
                    <Card>
                      <CardMedia
                        // onClick={() =>
                        //   navigate(`/gallery/${item.id}/posts/${username}`)
                        // }
                        component="img"
                        height="250"
                        image={nft.image}
                        alt="image"
                        style={{ objectFit: "contain " }}
                      />
                      <CardContent>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="h6" component="div">
                            Titulo
                          </Typography>
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
                            disabled={isLoading}
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
          </>
        )}
      </Box>
      <NavigationBar
        username={username}
        isLoading={isMint ? isLoading : isPayment ? isLoading : false}
      />
    </Box>
  );
};

export default MobileView;
