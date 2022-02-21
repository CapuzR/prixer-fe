import React, { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Masonry from "@mui/lab/Masonry";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import SettingsInputCompositeOutlinedIcon from "@mui/icons-material/SettingsInputCompositeOutlined";

const toolbarHeight = 68;

function Main() {
  const [isArtDone] = useState(Boolean(localStorage.getItem("isArtDone")));
  const [searchParams] = useSearchParams();
  const [isArtSelected, setIsArtSelected] = useState(true);
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [showPrixerList, setShowPrixerList] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  useEffect(() => {
    if (isArtDone) {
      if (searchParams.get("isEdit") === "true") {
        navigate("/main?page=profile&isEdit=true");
      } else if (searchParams.get("image")) {
        navigate("/main?page=profile&image=" + searchParams.get("image"));
      } else {
        navigate("/main?page=profile");
      }
    }
  }, [searchParams]);

  const images = [
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
      title: "Snacks",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
      title: "Tower",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d",
      title: "Tree",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1627000086207-76eabf23aa2e",
      title: "Camping Car",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7",
      title: "Mountain",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <MuiAppBar position="fixed" style={{ height: toolbarHeight }}>
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
        {searchParams.get("page") === "profile" ? (
          searchParams.get("isEdit") === "true" ? (
            <Box style={{ padding: 16 }}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4">
                  {isEditProfile ? "Profile" : "Your cameras & lenses"}
                </Typography>

                <IconButton
                  color="primary"
                  onClick={() => navigate("/main&page=profile")}
                  style={{ marginLeft: "auto" }}
                >
                  <ArrowCircleLeftOutlinedIcon fontSize="large" />
                </IconButton>
              </Box>
              {isEditProfile ? (
                <>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 8,
                    }}
                  >
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
                <>
                  <Grid container spacing={1} style={{ marginTop: 24 }}>
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
                </>
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
                    background: !isEditProfile && "white",
                    color: !isEditProfile && "black",
                  }}
                  onClick={() => setIsEditProfile(true)}
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
                    background: isEditProfile && "white",
                    color: isEditProfile && "black",
                  }}
                  onClick={() => setIsEditProfile(false)}
                >
                  Cameras & Lenses
                </Button>
              </Box>
            </Box>
          ) : searchParams.get("image") ? (
            <Box>
              <Box style={{ padding: 16 }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4">Art Detail</Typography>

                  <IconButton
                    color="primary"
                    onClick={() => navigate("/main?page=profile")}
                    style={{ marginLeft: "auto" }}
                  >
                    <ArrowCircleLeftOutlinedIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
              <img
                src={`${searchParams.get("image")}?w=162&auto=format`}
                srcSet={`${searchParams.get(
                  "image"
                )}?w=162&auto=format&dpr=2 2x`}
                alt={"image"}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "100%",
                }}
              />
              <Box style={{ padding: 16 }}>
                <Box style={{ display: "flex" }}>
                  <Box>
                    <Box>
                      <Typography variant="h5">Camino de Dios</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">short description</Typography>
                    </Box>
                  </Box>
                  <Box style={{ marginLeft: "auto" }}>
                    <IconButton color="primary">
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box style={{ marginTop: 24 }}>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ marginRight: 8 }}>
                      <CameraAltIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="p">Canon 7D Mark II</Typography>
                    </Box>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ marginRight: 8 }}>
                      <CameraOutlinedIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="p">
                        Canon EF 16-35mm f/2.8L II USM
                      </Typography>
                    </Box>
                  </Box>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box style={{ marginRight: 8 }}>
                      <SettingsInputCompositeOutlinedIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="p">
                        ISO: 100 Exposoure: 182s
                      </Typography>
                      <br />
                      <Typography variant="p">
                        Aperture: f-16.0 Lens mm: 16
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box style={{ marginTop: 16 }}>
                  <Typography variant="h6">Categories</Typography>
                </Box>
                <Box style={{ marginTop: 16 }}>
                  <Typography variant="h6">Comments</Typography>
                </Box>
              </Box>
            </Box>
          ) : showPrixerList ? (
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
                  {[1, 2, 3, 4].map((item, index) => (
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
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
          ) : (
            <>
              <div
                style={{
                  height: 100,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1643041447984-ff891bdf0815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTM4NTM1NA&ixlib=rb-1.2.1&q=80&w=1080')",
                  backgroundSize: "cover",
                }}
              />
              <Box>
                <Paper
                  elevation={3}
                  style={{
                    marginTop: -30,
                    marginLeft: 16,
                    marginRight: 16,
                    padding: 8,
                  }}
                >
                  <Box style={{ display: "flex" }}>
                    <Box style={{ marginRight: "12px" }}>
                      <Avatar style={{ width: 48, height: 48 }} />
                    </Box>
                    <Box>
                      <Box>
                        <Typography variant="body1">Gleiber Granado</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">ggranado</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          Una informacion corta del prixer asdalsdlasd
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate("/main?page=profile&isEdit=true")
                        }
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
                <Box
                  style={{
                    marginTop: 16,
                    display: "flex",
                    marginLeft: 16,
                    marginRight: 16,
                  }}
                >
                  <Box style={{ width: "50%", marginRight: "16px" }}>
                    <Button
                      style={{
                        textTransform: "capitalize",
                        background: !isArtSelected && "white",
                        color: !isArtSelected && "#000000",
                      }}
                      variant="contained"
                      fullWidth
                      onClick={() => setIsArtSelected(true)}
                    >
                      Art
                    </Button>
                  </Box>
                  <Box style={{ width: "50%" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      style={{
                        textTransform: "capitalize",
                        background: isArtSelected && "white",
                        color: isArtSelected && "#000000",
                      }}
                      onClick={() => setIsArtSelected(false)}
                    >
                      Gallery
                    </Button>
                  </Box>
                </Box>
                <Box style={{ padding: 16, paddingBottom: 72 }}>
                  {isArtSelected ? (
                    <Masonry columns={3} spacing={0.2}>
                      {images.map((item, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            navigate("/main?page=profile&image=" + item.img)
                          }
                        >
                          <img
                            src={`${item.img}?w=162&auto=format`}
                            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            style={{
                              borderBottomLeftRadius: 4,
                              borderBottomRightRadius: 4,
                              display: "block",
                              width: "100%",
                            }}
                          />
                        </div>
                      ))}
                    </Masonry>
                  ) : (
                    <Grid container spacing={1}>
                      {[1, 2, 3].map((item, index) => (
                        <Grid
                          key={index}
                          item
                          xs={12}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={3}
                          // sx={{
                          //   marginRight: {
                          //     sm: "4px",
                          //   },
                          // }}
                        >
                          <Card>
                            <CardMedia
                              component="img"
                              height="180"
                              image="https://images.unsplash.com/photo-1643310638896-b73dd89c4597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTQwNjY0MA&ixlib=rb-1.2.1&q=80&w=1080"
                              alt="image"
                            />
                            <CardContent>
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    Gleiber Granado
                                  </Typography>
                                </Box>
                                <Box style={{ marginLeft: "auto" }}>
                                  <IconButton color="primary">
                                    <MoreHorizIcon />
                                  </IconButton>
                                </Box>
                              </Box>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Explicacion de galeria
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
                {!mobileBreakpoint && (
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
                      // padding: 16,
                    }}
                  >
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton color="primary">
                        <HomeIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton
                        color="primary"
                        onClick={() => setShowPrixerList(true)}
                      >
                        <Typography
                          style={{
                            fontSize: 32,

                            fontWeight: "bold",
                          }}
                        >
                          P
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
                      <Fab color="primary">
                        <AddIcon />
                      </Fab>
                    </Box>
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton color="primary">
                        <LocalFireDepartmentIcon fontSize="large" />
                      </IconButton>
                    </Box>
                    <Box style={{ width: "20%", textAlign: "center" }}>
                      <IconButton color="primary">
                        <AccountCircleIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </Paper>
                )}
              </Box>
            </>
          )
        ) : (
          <Box style={{ padding: "32px" }}>
            <Typography variant="h5">Add your 1st art</Typography>
            <Paper elevation={5} style={{ padding: 24, marginTop: 8 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Button fullWidth component="label">
                    <AddPhotoAlternateIcon style={{ height: 230 }} />
                    <input type="file" hidden />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ width: "50%", marginRight: 4 }}>
                      <TextField
                        type="text"
                        label="Title"
                        variant="outlined"
                        required
                        fullWidth
                        style={{ marginBottom: 4 }}
                      />
                    </Box>
                    <Box style={{ width: "50%" }}>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                      >
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                          labelId="type-label"
                          id="type-label-select"
                          value={""}
                          label="Type"
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ width: "50%", marginRight: 4 }}>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                      >
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          id="category-select"
                          value={""}
                          label="Category"
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box style={{ width: "50%" }}>
                      <TextField
                        type="text"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: 4 }}
                      />
                    </Box>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Box style={{ width: "50%", marginRight: 4 }}>
                      <FormControl style={{ marginBottom: 4 }} fullWidth>
                        <InputLabel id="camera-label">Camera</InputLabel>
                        <Select
                          labelId="camera-label"
                          id="category-select"
                          value={""}
                          label="Camera"
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box style={{ width: "50%" }}>
                      <FormControl style={{ marginBottom: 8 }} fullWidth>
                        <InputLabel id="lens-label">Lens</InputLabel>
                        <Select
                          labelId="lens-label"
                          id="lens-select"
                          value={""}
                          label="Lens"
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <FormControl style={{ marginBottom: 4 }} fullWidth>
                    <InputLabel id="labels-label">Labels</InputLabel>
                    <Select
                      labelId="labels-label"
                      id="labels-select"
                      value={["label1", "label2"]}
                      label="Labels"
                      multiple
                    >
                      <MenuItem value={"label1"}>Ten</MenuItem>
                      <MenuItem value={"label2"}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    type="text"
                    label="About the art"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 4 }}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>
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
                  }}
                  // onClick={() => onHandleScreem(false)}
                  fullWidth
                >
                  Add another
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  style={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    background: "white",
                    color: "black",
                  }}
                  onClick={() => {
                    localStorage.setItem("isArtDone", true);
                    navigate("/main?page=profile");
                  }}
                >
                  Go to profile
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </div>
  );

  function onLogout() {
    localStorage.removeItem("isWalletAuth");
    localStorage.removeItem("isAuth");
    navigate("/login");
  }
}

export default Main;
