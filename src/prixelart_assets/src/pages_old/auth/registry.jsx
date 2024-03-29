import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";

import { readAndCompressImage } from "browser-image-resizer";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import AddBoxIcon from "@mui/icons-material/AddBox";

import service from "../service";
import Navbar from "../../components_old/navbar";
import ArtForm from "../../components_old/artForm";

function Registry() {
  const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexForPhone = /^[0-9]*$/;
  const regexForName = /^[a-zA-Z\s]*$/;

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
  const [assetProfile, setAssetProfile] = useState();
  const [imageProfile, setImageProfile] = useState();
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
  const [isAddFirstArt, setIsAddFirstArt] = useState(false);
  const [unit, setUnit] = useState("");

  ///FORM ART
  const [artTitle, setArtTitle] = useState("");
  const [artTypeArt, setArtTypeArt] = useState("");
  const [artCamera, setArtCamera] = useState("");
  const [artCategory, setArtCategory] = useState("");
  const [lensArt, setLensArt] = useState("");
  const [tagsArt, setTagsArt] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [aboutArt, setAboutArt] = useState("");
  const [galleryArt, setGalleryArt] = useState("");
  const [artLocation, setArtLocation] = useState("");
  const [choosePlan, setChoosePlan] = useState();
  const [setupStotage, setSetupStorage] = useState();
  const [asset, setAsset] = useState();
  const [blob, setBlob] = useState();
  const [artist, setArtist] = useState();

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
          <Box
            style={{
              padding: isAddFirstArt ? "0px" : "32px",
              paddingTop: isAddFirstArt ? "0px" : "16px",
              maxWidth: 1000,
              margin: "auto",
            }}
          >
            {isAddFirstArt ? (
              <>
                <ArtForm
                  blob={blob}
                  artist={artist}
                  navigate={navigate}
                  asset={asset}
                  handleChange={handleChange}
                  artTitle={artTitle}
                  setArtTitle={setArtTitle}
                  artType={artTypeArt}
                  setArtType={setArtTypeArt}
                  artCategory={artCategory}
                  setArtCategory={setArtCategory}
                  artCamera={artCamera}
                  setArtCamera={setArtCamera}
                  lensArt={lensArt}
                  setLensArt={setLensArt}
                  galleryArt={galleryArt}
                  setGalleryArt={setGalleryArt}
                  aboutArt={aboutArt}
                  setAboutArt={setAboutArt}
                  tagValue={tagValue}
                  setTagValue={setTagValue}
                  addTags={addTags}
                  tagsArt={tagsArt}
                  setTagsArt={setTagsArt}
                  onUpdateArt={console.log}
                  service={service}
                  artLocation={artLocation}
                  setArtLocation={setArtLocation}
                  galleries={[]}
                  firstArt={true}
                />
              </>
            ) : choosePlan ? (
              <>
                <Box style={{ padding: 24, maxWidth: 1000, margin: "auto" }}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      style={{
                        textAlign: "center",
                        width: "-webkit-fill-available",
                      }}
                    >
                      Choose your plan
                    </Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Paper
                      elevation={5}
                      style={{
                        padding: "24px 24px 0px 24px",
                        marginTop: 14,
                        width: "100%",
                        height: "calc(100vh - 300px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          style={{ marginBottom: 32 }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div style={{ width: "70%" }}>
                              <Button
                                variant="contained"
                                fullWidth
                                style={{ display: "block", borderRadius: 20 }}
                                onClick={() => setIsAddFirstArt(true)}
                              >
                                <h2>SOCIALS</h2>
                                <p>able to post with thumbnails</p>
                              </Button>
                            </div>
                            <div style={{ textAlign: "center", width: "30%" }}>
                              Free
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div style={{ width: "70%" }}>
                              <Button
                                variant="outlined"
                                fullWidth
                                style={{ display: "block", borderRadius: 20 }}
                                onClick={() => {
                                  setChoosePlan(false);
                                  setSetupStorage(true);
                                }}
                              >
                                <h2>SOCIALS + OWN</h2>
                                <p>able to store and own my photos</p>
                              </Button>
                            </div>
                            <div style={{ textAlign: "center", width: "30%" }}>
                              <div>$7/GB</div>
                              <div>Year</div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Box>
              </>
            ) : setupStotage ? (
              <>
                <Box style={{ padding: 24, maxWidth: 1000, margin: "auto" }}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      style={{
                        textAlign: "center",
                        width: "-webkit-fill-available",
                      }}
                    >
                      Setup your storage
                    </Typography>
                    <Button
                      style={{
                        color: "#5DBB63",
                        position: "absolute",
                        right: 235,
                      }}
                      onClick={() => {
                        setSetupStorage(false);
                        setIsAddFirstArt(true);
                      }}
                    >
                      CREATE
                    </Button>
                  </Box>
                  <Grid container spacing={1}>
                    <Paper
                      elevation={5}
                      style={{
                        padding: "24px 24px 24px 24px",
                        marginTop: 14,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100vh - 450px)",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          style={{ marginBottom: 32 }}
                        >
                          <div style={{ marginBottom: 8 }}>
                            <Typography variant="h6">
                              Choose your storage units
                            </Typography>
                          </div>
                          <div>
                            <FormControl
                              style={{ marginBottom: 4 }}
                              required
                              fullWidth
                            >
                              <InputLabel id="type-label">Units</InputLabel>
                              <Select
                                labelId="type-label"
                                id="type-label-select"
                                label="units"
                                value={unit}
                                onChange={(event) =>
                                  setUnit(event.target.value)
                                }
                              >
                                {[
                                  { id: 1, name: "1 unit: $6 GB" },
                                  { id: 2, name: "2 units: $12 GB" },
                                ].map((type) => (
                                  <MenuItem value={type.name} key={type.id}>
                                    {type.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <div style={{ marginBottom: 8 }}>
                            <Typography variant="h6">
                              Include principals to control your storage
                            </Typography>
                          </div>
                          <div>
                            <TextField
                              fullWidth
                              type="text"
                              label="Principals"
                              variant="outlined"
                              multiline
                              rows={5}
                              // value={about}
                              required
                              // onChange={(event) => setAbout(event.target.value)}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Box>
              </>
            ) : (
              <>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    variant="h6"
                  >
                    Welcome
                  </Typography>
                  {!isAddFirstArt && (
                    <Button
                      onClick={() => {
                        if (
                          !username ||
                          !displayName ||
                          !givenName ||
                          !familyName ||
                          !location ||
                          !email ||
                          !phone ||
                          !about ||
                          !artType ||
                          !assetProfile ||
                          !regexForEmail.test(email) ||
                          selectedCameras.length === 0 ||
                          selectedLens.length === 0
                        ) {
                          setIsSnackbarOpen(true);
                          setSeverity("error");
                          setMessage("please complete the form");
                        } else {
                          const parseCameras = selectedCameras.map(
                            (camera) => ({
                              Text: camera,
                            })
                          );
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
                                ["avatarAsset", { Slice: assetProfile }],
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
                              principal_id: JSON.parse(
                                localStorage.getItem("_scApp")
                              ).principal,
                              thumbnail: "",
                            },
                            username,
                            `${givenName} ${familyName}`
                          );
                        }
                      }}
                      style={{
                        color: "#5DBB63",
                        position: "absolute",
                        right: 235,
                      }}
                    >
                      Create
                    </Button>
                  )}
                </Box>
                <Paper elevation={3} style={{ padding: "24px" }}>
                  {!isUserData ? (
                    <>
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <IconButton component="label">
                          <Avatar
                            style={{ width: "120px", height: "120px" }}
                            src={imageProfile}
                          />
                          <input
                            hidden
                            type="file"
                            onChange={handleChangeAvatarProfile}
                          />
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
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
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
                            onChange={(event) =>
                              setDisplayName(event.target.value)
                            }
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
                            onChange={(event) => {
                              if (!regexForName.test(event.target.value)) {
                                return false;
                              } else {
                                setGivenName(event.target.value);
                              }
                            }}
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
                            onChange={(event) => {
                              if (!regexForName.test(event.target.value)) {
                                return false;
                              } else {
                                setFamilyName(event.target.value);
                              }
                            }}
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
                            onChange={(event) =>
                              setLocation(event.target.value)
                            }
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
                          {!regexForEmail.test(email) && email !== "" && (
                            <div
                              style={{
                                paddingLeft: "12px",
                                fontSize: "12px",
                                marginBottom: "6px",
                                color: "red",
                              }}
                            >
                              Plase use email format.
                            </div>
                          )}
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
                            onChange={(event) => {
                              if (!regexForPhone.test(event.target.value)) {
                                return false;
                              } else {
                                setPhone(event.target.value);
                              }
                            }}
                          />
                          {!regexForPhone.test(phone) && phone !== "" && (
                            <div
                              style={{
                                paddingLeft: "12px",
                                fontSize: "12px",
                                marginBottom: "6px",
                                color: "red",
                              }}
                            >
                              Formato no valido
                            </div>
                          )}
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
                              onChange={(event) =>
                                setArtType(event.target.value)
                              }
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
                        <FormControl
                          style={{ marginBottom: 4 }}
                          required
                          fullWidth
                          disabled={isLoading}
                        >
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
                          disabled={camera === "" || isLoading ? true : false}
                          onClick={() => addCameras(camera)}
                        >
                          <AddBoxIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h5">Lenses</Typography>
                        <FormControl
                          disabled={isLoading}
                          style={{ marginBottom: 4 }}
                          required
                          fullWidth
                        >
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
                          disabled={lens === "" || isLoading ? true : false}
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
              </>
            )}
          </Box>
        </Box>
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

  async function handleChangeAvatarProfile(event) {
    const file = event.target.files[0];

    let config = {
      quality: 1,
      maxWidth: 200,
      maxHeight: 200,
      autoRotate: true,
      debug: true,
    };

    let resizedImage = await readAndCompressImage(file, config);

    while (resizedImage.size > 250000) {
      config = {
        quality: 1,
        maxWidth: config.maxWidth - 50,
        maxHeight: config.maxWidth - 50,
        autoRotate: true,
        debug: true,
      };
      resizedImage = await readAndCompressImage(file, config);
    }

    const resizedString = await convertToBase64(file);
    const data = [...new Uint8Array(await resizedImage.arrayBuffer())];

    setAssetProfile(data);

    setImageProfile(resizedString);
  }

  async function handleChange(event) {
    const file = event.target.files[0];

    let config = {
      quality: 1,
      maxWidth: 600,
      maxHeight: 600,
      autoRotate: true,
      debug: true,
    };

    let resizedImage = await readAndCompressImage(file, config);

    while (resizedImage.size > 250000) {
      config = {
        quality: 1,
        maxWidth: config.maxWidth - 50,
        maxHeight: config.maxWidth - 50,
        autoRotate: true,
        debug: true,
      };
      resizedImage = await readAndCompressImage(file, config);
    }

    const resizedString = await convertToBase64(file);
    const data = [...new Uint8Array(await resizedImage.arrayBuffer())];

    setBlob(data);

    setAsset(resizedString);
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

  async function onCreateArtist(artist, username, fullname) {
    setIsLoading(true);
    setChoosePlan(true);
    Promise.all([
      service.addArtist(artist, username),
      service.relPrincipalWithUsername(username),
    ])
      .then(async () => {
        const artist = await service.getArtist();
        const parseArtist = service.parseArtist(artist);
        setArtist(parseArtist);
      })
      .catch(console.log);
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

  function addTags(currentTag) {
    if (currentTag !== "") {
      if (tagsArt.find((tag) => tag === currentTag)) {
        setIsSnackbarOpen(true);
        setSeverity("error");
        setMessage("Item already exist");
      } else {
        setTagsArt([...tagsArt, currentTag]);
        setTagValue("");
      }
    }
  }
}

export default Registry;
