import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { encode, decode } from 'uint8-to-base64';

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
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from '@mui/icons-material/Delete';

import service from "../service";
import Loading from "../../components/loading";

const toolbarHeight = 68;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Main() {
  const [isArtDone] = useState(Boolean(localStorage.getItem("isArtDone")));
  const [currentProfile, setCurrentProfile] = useState();
  const [avatar, setAvatar] = useState();
  const [searchParams] = useSearchParams();
  const [isArtSelected, setIsArtSelected] = useState(true);
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [showPrixerList, setShowPrixerList] = useState(false);

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [asset, setAsset] = useState();
  const [assetArt, setAssetArt] = useState();
  const [arts, setArts] = useState([])
  const [isCreateArt, setIsCreateArt] = useState(false);

  const [anchorElCreation, setAnchorElCreation] = React.useState(null);
  const openCreation = Boolean(anchorElCreation);
 
  
  const open = Boolean(anchorEl);

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

  useEffect(async () => {
    if (!Boolean(localStorage.getItem("wallet"))) navigate("/login");
    const profile = await service.getProfile();
    const arts = await getArtsPrincipal();
    if(arts.ok.length > 0) navigate("/main?page=profile");
    
    if (Object.keys(profile)[0] === "err") {
      navigate("/login");
      localStorage.clear();
    } else {
      setCurrentProfile(profile.ok[0][0].bio);
      setAvatar("data:image/jpeg;base64," + encode(profile.ok[1][0].payload[0]))
      setArts(arts.ok.map(result => ({
        image:"data:image/jpeg;base64," + encode(result[2].payload[0]),
        id:result[0],
        info:result[1]
      })))
        
    }
  }, []);

  useEffect(() => {
    if (currentProfile) {
      setUsername(currentProfile.username[0]);
      setDisplayName(currentProfile.displayName[0]);
      setGivenName(currentProfile.givenName[0]);
      setFamilyName(currentProfile.familyName[0]);
      setLocation(currentProfile.location[0]);
      setEmail(currentProfile.email[0]);
      setPhone(currentProfile.phone[0]);
      setAbout(currentProfile.about[0]);
    }
  }, [currentProfile]);

  useEffect(async () => {
    }, [])

  console.log(arts)
  return !currentProfile || isLoading ? (
    <Loading />
  ) : (
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
                      <Avatar src={avatar && avatar} style={{ width: "120px", height: "120px" }} />
                      <input hidden type="file" onChange={(event) => handleChange(event, true)}/>
                    </IconButton>
                  </Box>
                  <Grid container spacing={1} style={{ marginTop: "32px" }}>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Username"
                        variant="outlined"
                        value={username}
                        required
                        onChange={(event) => setUsername(event.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Display name"
                        variant="outlined"
                        required
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Given name"
                        value={givenName}
                        onChange={(event) => setGivenName(event.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Family name"
                        onChange={(event) => setFamilyName(event.target.value)}
                        variant="outlined"
                        value={familyName}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        onChange={(event) => setLocation(event.target.value)}
                        value={location}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        type="text"
                        label="Email"
                        value={email}
                        variant="outlined"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        type="text"
                        label="Phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        fullWidth
                        type="text"
                        label="About"
                        variant="outlined"
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
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
              {isEditProfile && (
                <Box style={{ marginTop: 12 }}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      onUpdateProfile({
                        bio: {
                          givenName: [givenName],
                          familyName: [familyName],
                          username: [username],
                          displayName: [displayName],
                          location: [location],
                          about: [about],
                          email: [email],
                          phone: [phone],
                          socials: [
                            {
                              deSo: [
                                {
                                  distrikt: [],
                                  dscvr: [],
                                  openChat: [],
                                },
                              ],
                              ceSo: [
                                {
                                  discord: [],
                                  twitter: [],
                                  instagram: [],
                                  facebook: [],
                                  tiktok: [],
                                },
                              ],
                            },
                          ],
                        },
                        avatarRequest: {
                  Put: {
                    key: JSON.parse(localStorage.getItem("_scApp")).principal,
                    contentType: "image/jpeg",
                    payload: {
                      Payload: asset,
                    },
                    callback: [],
                  },
                },
                      })
                    }
                  >
                    Update
                  </Button>
                </Box>
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
                src={arts.find(art => art.id === searchParams.get("image"))?.image}
                srcSet={arts.find(art => art.id === searchParams.get("image"))?.image}
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
                      <Typography variant="h5">{arts.find(art => art.id === searchParams.get("image"))?.info?.artBasics?.title}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">{arts.find(art => art.id === searchParams.get("image")).info?.artBasics?.about}</Typography>
                    </Box>
                  </Box>
                  <Box style={{ marginLeft: "auto" }}>
                    <IconButton color="primary">
                      <DeleteIcon onClick={() => deleteArt(searchParams.get("image"))}/>
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
          ) : isCreateArt ? <Box style={{ padding: 24 }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h4">Create Art</Typography>

                  <IconButton
                    color="primary"
                    onClick={() => setIsCreateArt(false)}
                    style={{ marginLeft: "auto" }}
                  >
                    <ArrowCircleLeftOutlinedIcon fontSize="large" />
                  </IconButton>
                </Box>
                <Grid container spacing={1}>
                    <Paper elevation={5} style={{ padding: 24, marginTop: 14 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                          {assetArt ?  
                            <Button component="label">
                              <img 
                                src={ assetArt} 
                                alt="image" 
                                srcSet={`${assetArt}`}
                                loading="lazy"
                                style={{
                                  borderBottomLeftRadius: 4,
                                  borderBottomRightRadius: 4,
                                  display: "block",
                                  width: "100%",
                                }} />
                              <input type="file" hidden onChange={(event) => handleChange(event, false)}/>
                            </Button>
                        : <Button fullWidth component="label">
                              <AddPhotoAlternateIcon style={{ height: 230, width:80 }} />
                              <input type="file" hidden onChange={(event) => handleChange(event, false)}/>
                          </Button> }
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
                      <Box style={{ marginTop: 12 }}>
                        <Button
                          variant="outlined"

                          onClick={() => {
onCreateArt({
                            artBasics:{
                              artGalleries: [],
                              artType: {
                              description: "LOL",
                              id: "1",
                              name: "photography",
                            },
                            title: "Titulo de arte de prueba",
                            about: "Esto es un sobre que corto",
                            artCategory: {
                              description: "Description category",
                              id: "LOL",
                              name: "Name in category"  
                            },
                            tags:[],
                            tools:[]
                          },
                          artRequest: {
                            Put: {
                              key: "lol",
                              contentType: "image/jpeg",
                              payload: {
                                Payload: asset,
                              },
                              callback: [],
                            },
                          }
                          })
                            navigate("/main?page=profile")
                         }}
                  >
                    Create
                  </Button>
                      </Box>
                      <Box
                        style={{
                          marginTop: "32px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                    </Box>
            </Paper>
                </Grid>
              </Box> : (
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
                      <Avatar src={avatar && avatar} style={{ width: 48, height: 48 }} />
                    </Box>
                    <Box>
                      <Box>
                        <Typography variant="body1">{`${currentProfile.givenName[0]} ${currentProfile.familyName[0]}`}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">{`${currentProfile.displayName[0]}`}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          {`${currentProfile.about[0]}`}
                        </Typography>
                      </Box>
                    </Box>
                    <Box style={{ marginLeft: "auto" }}>
                      <Box>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            navigate("/main?page=profile&isEdit=true")
                          }
                        >
                          <EditIcon fontFamily="small" color="primary" />
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          color="primary"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <MoreHorizIcon color="primary" fontFamily="small" />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            style={{ color: "red" }}
                            onClick={()=> deleteProfile()}
                          >
                            Delete profile
                          </MenuItem>
                        </Menu>
                      </Box>
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
                      {arts.map((item, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            navigate("/main?page=profile&image=" + item.id)
                          }
                        >
                          <img
                            src={`${item.image}`}
                            srcSet={`${item.image}`}
                            alt={item.id}
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
                      <Fab 
                        color="primary"   
                        id="basic-button"
                        aria-controls={openCreation ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openCreation ? 'true' : undefined}
                        onClick={handleClickCreation}>
                        <AddIcon />
                      </Fab>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorElCreation}
                        open={openCreation}
                        onClose={() => setAnchorElCreation(null)}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={() => {
                          setIsCreateArt(true);
                          setAnchorElCreation(null)
                        }}>
                          Create Art
                        </MenuItem>
                        <MenuItem onClick={console.log}>Create Gallery</MenuItem>
                      </Menu>
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
                  {assetArt ?  
                    <Button component="label">
                      <img 
                        src={ assetArt} 
                        alt="image" 
                        srcSet={`${assetArt}`}
                        loading="lazy"
                        style={{
                          borderBottomLeftRadius: 4,
                          borderBottomRightRadius: 4,
                          display: "block",
                          width: "100%",
                        }} />
                      <input type="file" hidden onChange={(event) => handleChange(event, false)}/>
                    </Button>
                  : <Button fullWidth component="label">
                      <AddPhotoAlternateIcon style={{ height: 230, width:80 }} />
                      <input type="file" hidden onChange={(event) => handleChange(event, false)}/>
                  </Button> }
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
              <Box style={{ marginTop: 12 }}>
                  <Button
                    variant="outlined"
                    onClick={() => onCreateArt({
                            artBasics:{
                              artGalleries: [],
                              artType: {
                              description: "LOL",
                              id: "1",
                              name: "photography",
                            },
                            title: "Titulo de arte de prueba",
                            about: "Esto es un sobre que corto",
                            artCategory: {
                              description: "Description category",
                              id: "LOL",
                              name: "Name in category"  
                            },
                            tags:[],
                            tools:[]
                          },
                          artRequest: {
                            Put: {
                              key: "lol",
                              contentType: "image/jpeg",
                              payload: {
                                Payload: asset,
                              },
                              callback: [],
                            },
                          }
                          })}
                  >
                    Create
                  </Button>
                </Box>
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
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseSnackbar}
        open={isSnackbarOpen}
        TransitionComponent={SlideTransition}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );

  function convertToBase64(blob) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async function handleChange(e, isAvatar) {
    const file = e.target.files[0];
    const resizedString = await convertToBase64(file);
    const data = [...new Uint8Array(await file.arrayBuffer())];
    if(isAvatar) setAvatar(resizedString);
    else setAssetArt(resizedString)    
    setAsset(data);
  }

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

   function handleClickCreation (event){
    setAnchorElCreation(event.currentTarget);
  };
  
function onLogout() {
    localStorage.removeItem("isWalletAuth");
    localStorage.removeItem("isAuth");
    navigate("/login");
  }



  async function onUpdateProfile(profileData) {
    setIsLoading(true);
    await service.updateProfile(profileData);
    setIsLoading(false);
    setIsSnackbarOpen(true);
    setMessage("Perfil actualizado correctamente");
    setSeverity("success");
    setAsset(undefined)
  }

  async function onCreateArt(artUpdate) {
    setIsLoading(true);
    await service.createArt(artUpdate);
    setAsset(undefined)
    const arts = await getArtsPrincipal();
    await setArts(arts.ok.map(result => 
      ({
        image:"data:image/jpeg;base64," + encode(result[2].payload[0]),
        id:result[0],
        info:result[1]
      })
    ))
    setIsCreateArt(false)
    setIsLoading(false);
    setIsSnackbarOpen(true);
    setMessage("Arte creado correctamente");
    setSeverity("success");
  }

  async function getArtsPrincipal(){
    return await service.getArtsByPrincipal(JSON.parse(localStorage.getItem("_scApp")).principal)
  }

  async function deleteProfile(){
    setIsLoading(true);
    await service.deleteProfile(JSON.parse(localStorage.getItem("_scApp")).principal);
    localStorage.clear();
    navigate("/login")
  }

  async function deleteArt(id){
    setIsLoading(true);
    await service.deleteArt(id);
    const arts = await getArtsPrincipal();
 
    await setArts(arts.ok.map(result => ({
        image:"data:image/jpeg;base64," + encode(result[2].payload[0]),
        id:result[0],
        info:result[1]
      })))
    setIsLoading(false);
    navigate("/main?page=profile");
    setIsSnackbarOpen(true);
    setMessage("Arte eliminado correctamente");
    setSeverity("success");
    
  }
}

export default Main;
