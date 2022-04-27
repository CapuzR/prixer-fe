import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import AddBoxIcon from "@mui/icons-material/AddBox";

import service from "../service";
import Navbar from "../../components/navbar";

function Registry({}) {
  const [isUserData, setIsUserData] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [asset, setAsset] = useState();
  const [image, setImage] = useState(
    "https://via.placeholder.com/300.png/09f/fff"
  );
  const [artType, setArtType] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [tools] = useState([
    {
      id: 1,
      name: "Lente 1 de prueba",
      description: "Prueba description",
      category: "lens",
    },
    {
      id: 2,
      name: "Lente 2 de prueba",
      description: "Prueba description",
      category: "lens",
    },
    {
      id: 3,
      name: "Camera 1 de prueba",
      description: "Prueba description",
      category: "camera",
    },
    {
      id: 4,
      name: "Camera 2 de prueba",
      description: "Prueba description",
      category: "camera",
    },
  ]);
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [selectedLens, setSelectedLens] = useState([]);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const toolbarHeight = 68;

  useEffect(() => {
    async function init() {
      if (!localStorage.getItem("wallet")) {
        return navigate("/login");
      }
      const artist = await service.getArtist();
      if (artist.length > 0) {
        alert("User already exist!");

        return navigate("/main");
      }
    }

    init();
  }, []);
  return (
    <>
      <div>
        <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
        <Box style={{ paddingTop: toolbarHeight }}>
          <Box style={{ padding: "32px", paddingTop: "16px" }}>
            <Typography variant="h4">Welcome!</Typography>
            <Paper elevation={3} style={{ padding: "24px" }}>
              {!isUserData ? (
                <>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton component="label">
                      <Avatar
                        style={{ width: "120px", height: "120px" }}
                        src={image}
                      />
                      <input hidden type="file" onChange={handleChange} />
                    </IconButton>
                  </Box>
                  <Grid container spacing={1} style={{ marginTop: "32px" }}>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        disabled={isLoading}
                        type="text"
                        label="Username"
                        variant="outlined"
                        required
                        fullWidth
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        disabled={isLoading}
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
                        disabled={isLoading}
                        type="text"
                        label="Given name"
                        variant="outlined"
                        fullWidth
                        required
                        value={givenName}
                        onChange={(event) => setGivenName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        disabled={isLoading}
                        type="text"
                        label="Family name"
                        variant="outlined"
                        required
                        fullWidth
                        value={familyName}
                        onChange={(event) => setFamilyName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        type="text"
                        disabled={isLoading}
                        label="Location"
                        variant="outlined"
                        fullWidth
                        required
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        type="text"
                        disabled={isLoading}
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <TextField
                        fullWidth
                        type="text"
                        label="Phone"
                        disabled={isLoading}
                        variant="outlined"
                        value={phone}
                        required
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                      <FormControl
                        style={{ marginBottom: 4 }}
                        required
                        fullWidth
                        disabled={isLoading}
                      >
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                          labelId="type-label"
                          id="type-label-select"
                          value={artType}
                          onChange={(event) => setArtType(event.target.value)}
                          label="Type"
                        >
                          {[
                            { id: 1, name: "Photopgrapher" },
                            { id: 2, name: "Designer" },
                          ].map((type) => (
                            <MenuItem value={type.name} key={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        fullWidth
                        type="text"
                        label="About"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={about}
                        required
                        disabled={isLoading}
                        onChange={(event) => setAbout(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="h5">Cameras</Typography>
                    <FormControl style={{ marginBottom: 4 }} required fullWidth>
                      <Select
                        required
                        labelId="camera-label"
                        id="camera-label-select"
                        value={camera}
                        onChange={(event) => setCamera(event.target.value)}
                      >
                        {tools.map(
                          (type) =>
                            type.category === "camera" && (
                              <MenuItem value={type.id} key={type.id}>
                                {type.name}
                              </MenuItem>
                            )
                        )}
                      </Select>
                    </FormControl>
                    <Box style={{ marginTop: "8px" }}>
                      {selectedCameras.map((item, index) => (
                        <Chip
                          label={item}
                          variant="outlined"
                          style={{ marginBottom: "8px" }}
                          key={index}
                          onDelete={() => {
                            setSelectedCameras(
                              selectedCameras.filter((tl) => tl !== item)
                            );
                          }}
                        />
                      ))}
                    </Box>
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
                    <IconButton
                      size="large"
                      color="primary"
                      disabled={camera === "" ? true : false}
                      onClick={() => addCameras(camera)}
                    >
                      <AddBoxIcon fontSize="large" color="primary" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="h5">Lenses</Typography>
                    <FormControl style={{ marginBottom: 4 }} required fullWidth>
                      <Select
                        labelId="lenses-label"
                        id="lenses-label-select"
                        value={lens}
                        onChange={(event) => setLens(event.target.value)}
                      >
                        {tools.map(
                          (type) =>
                            type.category === "lens" && (
                              <MenuItem value={type.id} key={type.id}>
                                {type.name}
                              </MenuItem>
                            )
                        )}
                      </Select>
                    </FormControl>
                    <Box style={{ marginTop: "8px" }}>
                      {selectedLens.map((tool, index) => (
                        <Chip
                          label={tool}
                          style={{ marginBottom: "8px" }}
                          variant="outlined"
                          key={index}
                          onDelete={() => {
                            setSelectedLens(
                              selectedLens.filter((tl) => tl !== tool)
                            );
                          }}
                        />
                      ))}
                    </Box>
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
                    <IconButton
                      disabled={lens === "" ? true : false}
                      size="large"
                      onClick={() => addLens(lens)}
                      color="primary"
                    >
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
                  disabled={isLoading}
                  onClick={() => onHandleScreem(false)}
                  fullWidth
                >
                  Basics
                </Button>
                <Button
                  disabled={isLoading}
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
          disabled={
            !username ||
            !displayName ||
            !givenName ||
            !familyName ||
            !location ||
            !email ||
            !phone ||
            !about ||
            !artType ||
            selectedCameras.length === 0 ||
            selectedLens.length === 0
          }
          onClick={async () => {
            const parseCameras = selectedCameras.map((camera) => ({
              Text: camera,
            }));
            const parseLens = selectedLens.map((lens) => ({
              Text: lens,
            }));
            onCreateArtist(
              {
                description: "Artista de prueba",
                details: [
                  ["firstName", { Text: givenName }],
                  ["lastName", { Text: familyName }],
                  ["artType", { Text: artType }],
                  ["username", { Text: username }],
                  ["displayName", { Text: displayName }],
                  ["location", { Text: location }],
                  ["email", { Text: email }],
                  ["phone", { Text: phone }],
                  ["about", { Text: about }],
                  [
                    "cameras",
                    {
                      Vec: parseCameras,
                    },
                  ],
                  [
                    "lens",
                    {
                      Vec: parseLens,
                    },
                  ],
                ],
                frontend: [],
                name: `${givenName} ${familyName}`,
                principal_id: JSON.parse(localStorage.getItem("_scApp"))
                  .principal,
                thumbnail:
                  "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg",
              },
              username
            );
          }}
        >
          {isLoading ? (
            <CircularProgress style={{ color: "#FFFFFF" }} />
          ) : (
            <ChevronRightIcon />
          )}
        </Fab>
      </div>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseSnackbar}
        open={isSnackbarOpen}
        TransitionComponent={SlideTransition}
        style={{ display: isSnackbarOpen ? "flex" : "none" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
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

  async function handleChange(e) {
    const file = e.target.files[0];
    const resizedString = await convertToBase64(file);

    const data = [...new Uint8Array(await file.arrayBuffer())];
    setImage(resizedString);
    setAsset(data);
  }

  function onHandleScreem(screen) {
    setIsUserData(screen);
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

  async function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }

  async function onCreateArtist(artist, username) {
    setIsLoading(true);
    await Promise.all([
      service.addArtist(artist, username),
      service.relPrincipalWithUsername(username),
    ]).then(() => {
      navigate("/main");
      setIsLoading(false);
    });
  }

  function addCameras(id) {
    const tool = tools.find((tl) => tl.id === id);

    if (selectedCameras.find((tl) => tl === tool.name)) {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage("Item already exist");
    } else {
      setSelectedCameras([...selectedCameras, tool.name]);
    }
  }
  function addLens(id) {
    const tool = tools.find((tl) => tl.id === id);

    if (selectedLens.find((tl) => tl === tool.name)) {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage("Item already exist");
    } else {
      setSelectedLens([...selectedLens, tool.name]);
    }
  }
}

export default Registry;
