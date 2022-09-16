import React, { useState } from "react";
import * as React from "react";
import { readAndCompressImage } from "browser-image-resizer";

import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ToolsForm from "./toolsForm";

function RegistryForm({
  isMobile,
  createArtist,
  isUpdate,
  handleUpdateProfile,
  updateUsername,
  updateDisplayName,
  updateGivenName,
  updateFamilyName,
  updateLocation,
  updateEmail,
  updatePhone,
  updateAbout,
  updateArtType,
  updateAvatar,
  updateCameras,
  updateLens,
  updateArtist,
  isLoading,
}) {
  const [screen, setScreen] = useState("user");
  const [avatar, setAvatar] = useState(updateAvatar ? updateAvatar : undefined);
  const [username, setUsername] = useState(
    updateUsername ? updateUsername : ""
  );
  const [displayName, setDisplayName] = useState(
    updateDisplayName ? updateDisplayName : ""
  );
  const [givenName, setGivenName] = useState(
    updateGivenName ? updateGivenName : ""
  );
  const [familyName, setFamilyName] = useState(
    updateFamilyName ? updateFamilyName : ""
  );
  const [location, setLocation] = useState(
    updateLocation ? updateLocation : ""
  );
  const [email, setEmail] = useState(updateEmail ? updateEmail : "");
  const [phone, setPhone] = useState(updatePhone ? updatePhone : "");
  const [about, setAbout] = useState(updateAbout ? updateAbout : "");
  const [artType, setArtType] = useState(updateArtType ? updateArtType : "");
  const [avatarAsset, setAvatarAsset] = useState();

  const [camera, setCamera] = useState(3);
  const [lens, setLens] = useState(1);
  const [selectedCameras, setSelectedCameras] = useState(
    updateCameras ? updateCameras : []
  );
  const [selectedLens, setSelectedLens] = useState(
    updateLens ? updateLens : []
  );

  const handleScreen = (view) => setScreen(view);

  const convertToBase64 = (blob) => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleChangeAvatar = async (event) => {
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

    setAvatarAsset(data);
    setAvatar(resizedString);
  };

  const isDisabled = () => {
    if (isUpdate) {
      return selectedCameras.length === 0 ||
        selectedLens.length === 0 ||
        !username ||
        !displayName ||
        !givenName ||
        !familyName ||
        !location ||
        !email ||
        !phone ||
        !regexForEmail.test(email) ||
        !about
        ? true
        : false;
    } else {
      return selectedCameras.length === 0 ||
        selectedLens.length === 0 ||
        !avatar ||
        !username ||
        !displayName ||
        !givenName ||
        !familyName ||
        !location ||
        !email ||
        !phone ||
        !regexForEmail.test(email) ||
        !about
        ? true
        : false;
    }
  };

  const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexForPhone = /^[0-9]*$/;
  const regexForName = /^[a-zA-Z\s]*$/;

  return (
    <Box style={{ padding: 12 }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        {isUpdate && (
          <IconButton
            disabled={isLoading}
            color="primary"
            onClick={() => handleUpdateProfile(false)}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
        )}
        <Box
          style={{
            display: "flex",
            justifyContent: isUpdate && "center",
            margin: isUpdate && "auto",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"}>
            {isUpdate ? "Update profile" : "Welcome"}
          </Typography>
        </Box>
        <Box style={{ marginLeft: isUpdate ? "" : "auto" }}>
          <Button
            style={{
              color: isDisabled() || isLoading ? "#C5C5C5" : "#5DBB63",
            }}
            disabled={isDisabled() || isLoading}
            onClick={() => {
              const parseCameras = selectedCameras.map((camera) => ({
                Text: camera,
              }));
              const parseLens = selectedLens.map((lens) => ({
                Text: lens,
              }));
              const key = !avatarAsset ? "False" : "True";

              if (isUpdate) {
                updateArtist({
                  description: "Artista de prueba",
                  details: [
                    ["firstName", { Text: givenName }],
                    ["lastName", { Text: familyName }],
                    ["artType", { Text: artType }],
                    ["username", { Text: username }],
                    ["displayName", { Text: displayName }],
                    [
                      "avatarAsset",
                      { Vec: [{ Slice: avatarAsset }, { True: null }] },
                    ],
                    ["bannerAsset", { Vec: [{ False: null }] }],
                    ["location", { Text: location }],
                    ["email", { Text: email }],
                    ["phone", { Text: phone }],
                    ["about", { Text: about }],
                    // ["canisterId", { Principal: artist.canisterId }],
                    // ["assetCanId", { Principal: artist.assetCanisterId }],
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

                  thumbnail: `http://localhost:8000/A${
                    JSON.parse(localStorage.getItem("_scApp")).principal
                  }?canisterId=rno2w-sqaaa-aaaaa-aaacq-cai`,
                });
              } else {
                createArtist(
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
                      ["avatarAsset", { Slice: avatarAsset }],
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
                    thumbnail: "",
                  },
                  username
                );
              }
            }}
          >
            {isUpdate ? "Update" : "Create"}
          </Button>
        </Box>
      </Box>
      <Paper elevation={1} style={{ padding: "24px" }}>
        {screen === "user" ? (
          <Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <IconButton component="label" isabled={isLoading}>
                <Avatar
                  style={{ width: "120px", height: "120px" }}
                  src={avatar}
                />
                <input
                  hidden
                  type="file"
                  onChange={handleChangeAvatar}
                  disabled={isLoading}
                />
              </IconButton>
            </Box>
            <Grid container spacing={2} style={{ marginTop: "32px" }}>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Username"
                  variant="outlined"
                  required
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Display name"
                  variant="outlined"
                  required
                  fullWidth
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Given name"
                  variant="outlined"
                  required
                  fullWidth
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
                  onChange={(e) => {
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
                  disabled={isLoading}
                  type="text"
                  label="Location"
                  variant="outlined"
                  required
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Email"
                  variant="outlined"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!regexForEmail.test(email) && email !== "" && (
                  <div
                    style={{
                      paddingLeft: "12px",
                      fontSize: "12px",
                      marginBottom: "6px",
                      color: "red",
                      position: "absolute",
                    }}
                  >
                    Plase use email format.
                  </div>
                )}
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                <TextField
                  disabled={isLoading}
                  type="text"
                  label="Phone"
                  variant="outlined"
                  required
                  fullWidth
                  value={phone}
                  onChange={(e) => {
                    if (!regexForPhone.test(event.target.value)) {
                      return false;
                    } else {
                      setPhone(event.target.value);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
                <FormControl style={{ marginBottom: 4 }} required fullWidth>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type-label-select"
                    value={artType}
                    onChange={(event) => setArtType(event.target.value)}
                    label="Type"
                    disabled={isLoading}
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
                  multiline
                  rows={3}
                  type="text"
                  label="About"
                  variant="outlined"
                  required
                  fullWidth
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <ToolsForm
            camera={camera}
            setCamera={setCamera}
            lens={lens}
            setLens={setLens}
            selectedCameras={selectedCameras}
            setSelectedCameras={setSelectedCameras}
            selectedLens={selectedLens}
            setSelectedLens={setSelectedLens}
            isLoading={isLoading}
          />
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
              borderRadius: 10,
              boxShadow: "none",
              background: screen !== "user" && "#FFFFFF",
              color: screen !== "user" && "#000000",
            }}
            onClick={() => handleScreen("user")}
            fullWidth
            disabled={isLoading}
          >
            Basics
          </Button>
          <Button
            fullWidth
            variant="contained"
            style={{
              textTransform: "capitalize",
              fontSize: "12px",
              borderRadius: 10,
              background: screen !== "tools" && "#FFFFFF",
              color: screen !== "tools" && "#000000",
              boxShadow: "none",
            }}
            onClick={() => handleScreen("tools")}
            disabled={isLoading}
          >
            Cameras & Lenses
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegistryForm;
