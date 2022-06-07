import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import consts from "../../consts/index";
import service from "../service";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

function CollectionDetail({ window }) {
  const navigate = useNavigate();
  const params = useParams();
  const toolbarHeight = 68;
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

  const [isOpenSideMenu, setIsOpenSideManu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionScreem, setCollectionScreem] = useState(
    consts.COLLECTION_SCREEN_NFTS
  );
  const [isShowChartInfo, setIsShowChartInfo] = useState(false);

  const drawerwidth = isOpenSideMenu ? 240 : 80;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar
        onLogout={onLogout}
        toolbarHeight={toolbarHeight}
        isOpenSideMenu={isOpenSideMenu}
        mobileBreakpoint={mobileBreakpoint}
      />
      <Sidebar
        drawerwidth={drawerwidth}
        handleDrawerToggle={handleDrawerToggle}
        container={container}
        isOpenSideMenu={isOpenSideMenu}
      />
      <Box style={{ paddingTop: toolbarHeight }}>
        {isLoading ? (
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box style={{ padding: 16, maxWidth: 1000, margin: "auto" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                style={{ position: "absolute" }}
                color="primary"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon fontSize="medium" />
              </IconButton>
              <Typography
                variant="h6"
                style={{ textAlign: "center", width: "-webkit-fill-available" }}
              >
                {`Collection ${params.collectionId}`}
              </Typography>
            </Box>
            <Box>
              <Paper
                elevation={3}
                style={{
                  marginTop: 8,
                  marginLeft: !mobileBreakpoint ? 16 : "auto",
                  marginRight: !mobileBreakpoint ? 16 : "auto",
                  padding: 8,
                  maxWidth: mobileBreakpoint && 600,
                }}
              >
                <Box>
                  <Box
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: 8,
                      }}
                      variant="h6"
                    >{`${params.collectionId}`}</Typography>
                    <Box style={{ marginLeft: "auto" }}>
                      {!isShowChartInfo && (
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      )}

                      <IconButton
                        color="primary"
                        onClick={() => setIsShowChartInfo(!isShowChartInfo)}
                      >
                        <ShowChartIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  {isShowChartInfo ? (
                    <Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 8,
                        }}
                      >
                        <Typography
                          variant="body"
                          style={{ marginRight: 4, fontWeight: 900 }}
                        >
                          Status:
                        </Typography>
                        <Typography variant="body" style={{ color: "green" }}>
                          Active
                        </Typography>
                      </Box>
                      <Box style={{ marginBottom: 32 }}>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            style={{ paddingRight: 32, textAlign: "center" }}
                          >
                            <Box>
                              <Typography variant="h6">Min</Typography>
                            </Box>
                            <Box>
                              <Typography variant="h6">130 ICP</Typography>
                            </Box>
                          </Box>
                          <Box
                            style={{ textAlign: "center", paddingRight: 32 }}
                          >
                            <Box>
                              <Typography variant="h6">Avg.</Typography>
                            </Box>
                            <Box>
                              <Typography variant="h6">600 ICP</Typography>
                            </Box>
                          </Box>
                          <Box style={{ textAlign: "center" }}>
                            <Box>
                              <Typography variant="h6">Max</Typography>
                            </Box>
                            <Box>
                              <Typography variant="h6">999 ICP</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Box
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginBottom: 8,
                        }}
                      >
                        <Typography
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          variant="body2"
                        >{`@${params.username}`}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ea quod possimus dolorum, ullam obcaecati natus?
                          Odio, corrupti! Sunt, eveniet. In dolor officia
                          repellendus amet autem voluptatem sequi cum itaque
                          earum?
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 8,
                        }}
                      >
                        <Typography
                          variant="body"
                          style={{ marginRight: 4, fontWeight: 900 }}
                        >
                          Status:
                        </Typography>
                        <Typography variant="body" style={{ color: "green" }}>
                          2nd market
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Box>
            <Box
              style={{
                marginTop: 16,
                display: "flex",
                marginLeft: !mobileBreakpoint ? 16 : "auto",
                marginRight: !mobileBreakpoint ? 16 : "auto",
                maxWidth: mobileBreakpoint && 600,
              }}
            >
              <Box style={{ width: "50%", paddingRight: 8 }}>
                <Button
                  disabled={isLoading}
                  style={{
                    borderBottom:
                      collectionScreem === consts.COLLECTION_SCREEN_NFTS &&
                      "2px solid #000000",

                    borderRadius: 0,
                    textTransform: "capitalize",
                    background:
                      collectionScreem === consts.COLLECTION_SCREEN_NFTS &&
                      "white",
                    color:
                      collectionScreem === consts.COLLECTION_SCREEN_NFTS &&
                      "#000000",
                  }}
                  fullWidth
                  onClick={() =>
                    setCollectionScreem(consts.COLLECTION_SCREEN_NFTS)
                  }
                >
                  NFTS
                </Button>
              </Box>
              <Box style={{ width: "50%", paddingRight: 8 }}>
                <Button
                  disabled={isLoading}
                  style={{
                    borderRadius: 0,
                    textTransform: "capitalize",
                    background:
                      collectionScreem === consts.COLLECTION_SCREEN_DETAILS &&
                      "white",
                    color:
                      collectionScreem === consts.COLLECTION_SCREEN_DETAILS &&
                      "#000000",
                    borderBottom:
                      collectionScreem === consts.COLLECTION_SCREEN_DETAILS &&
                      "2px solid #000000",
                  }}
                  fullWidth
                  onClick={() =>
                    setCollectionScreem(consts.COLLECTION_SCREEN_DETAILS)
                  }
                >
                  Details
                </Button>
              </Box>
            </Box>
            <Box style={{ padding: 16, paddingBottom: 72 }}>
              {collectionScreem === consts.COLLECTION_SCREEN_NFTS ? (
                <Grid
                  container
                  spacing={1}
                  style={{ maxWidth: 1000, margin: "auto" }}
                >
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
                          <Box
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit.
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
              ) : collectionScreem === consts.COLLECTION_SCREEN_DETAILS ? (
                <>Details</>
              ) : collectionScreem === consts.COLLECTION_SCREEN_CONSUMER ? (
                <>Detalle de cliente</>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

function onLogout() {
  service.onSignOutStoic();
  localStorage.clear();
  navigate("/login");
}

function handleDrawerToggle() {
  setIsOpenSideManu(!isOpenSideMenu);
}

export default CollectionDetail;
