import React from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ActionButton from "../../components/actionButton";
import MintNFTForm from "../../components/mintNFTForm";
// import { service } from "../../service";
// import consts from "../../consts";

const DesktopView = ({
  onLogout,
  window,
  fullName,
  handleSidebar,
  isOpenSidebar,
  username,
  isMobile,
  collection,
  handleView,
  isMint,
  mintNFT,
  onBack,
  publishCollection,
  tokens,
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  return (
    <Box style={{ height: "calc(100vh - 60px)" }}>
      <Navbar onLogout={onLogout} />
      <Sidebar
        drawerwidth={isOpenSidebar ? 240 : 80}
        container={container}
        isOpenSideMenu={isOpenSidebar}
        handleSidebar={handleSidebar}
        fullName={fullName}
        username={username}
      />
      <Box
        style={{
          marginTop: 60,
        }}
      >
        <Box
          style={{
            maxWidth: 1000,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 12,
          }}
        >
          {isMint ? (
            <MintNFTForm mintNFT={mintNFT} onBack={onBack} />
          ) : (
            <>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => navigate(-1)}
                  style={{ position: "absolute" }}
                >
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
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {/* <Typography
                  onClick={(event) => console.log(event)}
                  variant="h6"
                  className="mint-hl"
                  style={{ textDecoration: "underline" }}
                >{`NFTs`}</Typography> */}

                <Typography
                  onClick={(event) => publishCollection()}
                  variant="h6"
                  className="mint-hl"
                  style={{ textDecoration: "underline" }}
                >{`Publish collection`}</Typography>
              </div>
              <Box style={{ padding: 16, paddingBottom: 72 }}>
                {isMint ? (
                  "mint"
                ) : (
                  <Grid
                    container
                    spacing={1}
                    style={{ maxWidth: 1000, margin: "auto" }}
                  >
                    {tokens.map((nft, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={}
                        key={nft.id}
                      >
                        <Card>
                          <CardMedia
                            component="img"
                            height="250"
                            image={nft.image}
                            alt="image"
                              style={{ objectFit: "contain " }}
                          />
                          <CardContent>
                            <Box
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="h6" component="div">
                                {nft.name}
                              </Typography>
                            </Box>
                            <Box style={{ display: "flex", marginTop: 18 }}>
                              <Typography variant="body2">
                                {/* Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. */}
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
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <ActionButton />
    </Box>
  );
};

export default DesktopView;
