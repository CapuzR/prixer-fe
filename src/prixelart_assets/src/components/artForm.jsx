import React, { useState, forwardRef } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxIcon from "@mui/icons-material/AddBox";

function ArtForm({
  asset,
  blob,
  artist,
  navigate,
  isUpdate,
  handleChange,
  artTitle,
  setArtTitle,
  artType,
  setArtType,
  artCategory,
  setArtCategory,
  artCamera,
  setArtCamera,
  lensArt,
  setLensArt,
  galleryArt,
  setGalleryArt,
  aboutArt,
  setAboutArt,
  tagValue,
  setTagValue,
  addTags,
  tagsArt,
  setTagsArt,
  service,
  artLocation,
  setArtLocation,
  setIsEditPost,
  postId,
  setPost,
  post,
  firstArt,
  galleries,
}) {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [severity, setSeverity] = useState(undefined);

  return (
    <Box style={{ padding: 24, maxWidth: 1000, margin: "auto" }}>
      {/* <Button
        disabled={!artist}
        onClick={async () => {
          handleImg(artist, blob);
        }}
      >
        Prueba
      </Button> */}
      <Box style={{ display: "flex", alignItems: "center" }}>
        {!firstArt && (
          <IconButton
            color="primary"
            onClick={() => (!isUpdate ? navigate(-1) : setIsEditPost(false))}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
        )}
        <Typography
          variant="h6"
          style={{ textAlign: "center", width: "-webkit-fill-available" }}
        >
          {firstArt ? "New post" : isUpdate ? "Edit post" : "New post"}
        </Typography>

        <Button
          onClick={async () => {
            if (
              !artTitle ||
              !aboutArt ||
              !artType ||
              !artCamera ||
              !lensArt ||
              (!isUpdate && !asset) ||
              !artCategory
            ) {
              setIsSnackbarOpen(true);
              setSeverity("error");
              setMessage("please complete the form");
            } else {
              if (isUpdate) {
                service.updatePost(
                  {
                    artCategory: artCategory,
                    artType: artType,
                    description: aboutArt,
                    details: [
                      [
                        "galleryId",
                        { Text: galleryArt === "" ? "false" : galleryArt },
                      ],
                      [
                        "location",
                        { Text: artLocation === "" ? "false" : artLocation },
                      ],

                      [
                        "camera",
                        {
                          Vec: [{ Text: artCamera }],
                        },
                      ],
                      [
                        "lens",
                        {
                          Vec: [{ Text: lensArt }],
                        },
                      ],
                    ],
                    tags: tagsArt,
                    asset: "URL DE IMAGEN",
                    title: artTitle,
                    tools: [],
                  },
                  postId
                );
                setPost({
                  ...post,
                  post: {
                    postBasics: {
                      artCategory: artCategory,
                      artType: artType,
                      description: aboutArt,
                      details: [
                        [
                          "galleryId",
                          {
                            Text: galleryArt === "" ? "false" : galleryArt,
                          },
                        ],
                        [
                          "location",
                          {
                            Text: artLocation === "" ? "false" : artLocation,
                          },
                        ],

                        [
                          "camera",
                          {
                            Vec: [{ Text: artCamera }],
                          },
                        ],
                        [
                          "lens",
                          {
                            Vec: [{ Text: lensArt }],
                          },
                        ],
                      ],
                      tags: tagsArt,
                      asset: "URL DE IMAGEN",
                      title: artTitle,
                      tools: [],
                    },
                  },
                });
                setIsEditPost(false);
              } else {
                service.createPost(
                  {
                    artCategory: artCategory,
                    artType: artType,
                    description: aboutArt,
                    details: [
                      [
                        "galleryId",
                        { Text: galleryArt === "" ? "false" : galleryArt },
                      ],
                      [
                        "location",
                        { Text: artLocation === "" ? "false" : artLocation },
                      ],

                      [
                        "camera",
                        {
                          Vec: [{ Text: artCamera }],
                        },
                      ],
                      [
                        "lens",
                        {
                          Vec: [{ Text: lensArt }],
                        },
                      ],
                    ],
                    tags: tagsArt,
                    asset: "URL DE IMAGEN",
                    title: artTitle,
                    tools: [],
                  },
                  blob
                );
                service._createPost(
                  artist.canisterId,
                  {
                    artType: artType,
                    description: aboutArt,
                    details: [
                      [
                        "galleryId",
                        { Text: galleryArt === "" ? "false" : galleryArt },
                      ],
                      [
                        "location",
                        { Text: artLocation === "" ? "false" : artLocation },
                      ],

                      [
                        "camera",
                        {
                          Vec: [{ Text: artCamera }],
                        },
                      ],
                      [
                        "lens",
                        {
                          Vec: [{ Text: lensArt }],
                        },
                      ],
                    ],
                    tags: tagsArt,
                    title: artTitle,
                  },
                  blob
                );
                navigate(firstArt ? "/explore" : "/main");
              }
            }
          }}
          style={{
            marginLeft: !firstArt && "auto",
            color: "#5DBB63",
            position: firstArt && "absolute",
            right: firstArt && 35,
          }}
        >
          {isUpdate ? "Update" : "Add"}
        </Button>
      </Box>
      <Grid container spacing={1}>
        <Paper
          elevation={5}
          style={{
            padding: "24px 24px 0px 24px",
            marginTop: 14,
            width: "100%",
          }}
        >
          <Grid container spacing={1}>
            {!isUpdate && (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                style={{ textAlign: "center" }}
              >
                {asset ? (
                  <Button fullWidth component="label">
                    <img
                      src={asset}
                      alt="image"
                      style={{
                        width: "100%",
                        maxHeight: 184,
                        objectFit: "contain",
                      }}
                    />
                    <input
                      type="file"
                      hidden
                      onChange={(event) => handleChange(event, false)}
                    />
                  </Button>
                ) : (
                  <Button fullWidth component="label">
                    <AddPhotoAlternateIcon style={{ height: 184, width: 80 }} />
                    <input
                      type="file"
                      hidden
                      onChange={(event) => handleChange(event, false)}
                    />
                  </Button>
                )}
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sm={12}
              md={isUpdate ? 12 : 6}
              lg={isUpdate ? 12 : 8}
              xl={isUpdate ? 12 : 8}
            >
              <Box style={{ display: "flex", marginBottom: 8 }}>
                <Box style={{ width: "50%", marginRight: 4 }}>
                  <TextField
                    type="text"
                    label="Title"
                    variant="outlined"
                    required
                    fullWidth
                    value={artTitle}
                    onChange={(event) => setArtTitle(event.target.value)}
                  />
                </Box>
                <Box style={{ width: "50%" }}>
                  <FormControl style={{ marginBottom: 4 }} required fullWidth>
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
                </Box>
              </Box>
              <Box style={{ display: "flex", marginBottom: 8 }}>
                <Box style={{ width: "50%", marginRight: 4 }}>
                  <FormControl style={{ marginBottom: 4 }} required fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category-select"
                      value={artCategory}
                      label="Category"
                      onChange={(event) => setArtCategory(event.target.value)}
                    >
                      {[
                        { id: 1, name: "Landscape" },
                        { id: 2, name: "Portrait" },
                      ].map((type) => (
                        <MenuItem value={type.name} key={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box style={{ width: "50%" }}>
                  <TextField
                    type="text"
                    label="Location"
                    value={artLocation}
                    onChange={(event) => setArtLocation(event.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 4 }}
                  />
                </Box>
              </Box>
              <Box style={{ display: "flex" }}>
                <Box style={{ width: "50%", marginRight: 4 }}>
                  <FormControl style={{ marginBottom: 4 }} required fullWidth>
                    <InputLabel id="camera-label">Camera</InputLabel>
                    <Select
                      required
                      labelId="camera-label"
                      id="category-select"
                      value={artCamera}
                      onChange={(event) => setArtCamera(event.target.value)}
                      label="Camera"
                      disabled={!artist}
                    >
                      {artist ? (
                        artist.cameras.map((art, index) => (
                          <MenuItem key={index} value={art.Text}>
                            {art.Text}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>Loading...</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <Box style={{ width: "50%" }}>
                  <FormControl required fullWidth>
                    <InputLabel id="camera-label">Lenses</InputLabel>
                    <Select
                      labelId="camera-label"
                      id="category-select"
                      value={lensArt}
                      onChange={(event) => setLensArt(event.target.value)}
                      label="Lens"
                      disabled={!artist}
                    >
                      {artist ? (
                        artist.lens.map((art, index) => (
                          <MenuItem key={index} value={art.Text}>
                            {art.Text}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>Loading...</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            {!firstArt && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl style={{ marginBottom: 4 }} fullWidth>
                  <InputLabel id="gallery-label">Gallery</InputLabel>
                  <Select
                    labelId="gallery-label"
                    id="gallery-select"
                    value={galleryArt}
                    onChange={(event) => setGalleryArt(event.target.value)}
                    label="Labels"
                    disabled={!galleries}
                  >
                    {galleries ? (
                      galleries.map((gallery) => (
                        <MenuItem value={gallery.id}>{gallery.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                type="text"
                label="About"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 4 }}
                multiline
                rows={4}
                value={aboutArt}
                onChange={(event) => setAboutArt(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                placeholder="Labels"
                fullWidth
                value={tagValue}
                onChange={(event) => setTagValue(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => addTags(tagValue)}
                        color="primary"
                      >
                        <AddBoxIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Box style={{ marginTop: "8px", padding: 8 }}>
              {tagsArt?.map((tg) => (
                <Chip
                  key={tg}
                  label={tg}
                  variant="outlined"
                  style={{
                    marginBottom: "8px",
                    marginRight: "2px",
                  }}
                  onDelete={() =>
                    setTagsArt(tagsArt.filter((tag) => tag !== tg))
                  }
                />
              ))}
            </Box>
          </Grid>
          <Box style={{ marginTop: 12, display: "flex" }}>
            {firstArt && (
              <Typography
                style={{
                  // marginLeft: "auto",
                  textDecoration: "underline",
                  opacity: !artist && "0.3",
                }}
                variant="outlined"
                onClick={() => navigate("/explore")}
                className="skyp-text"
              >
                Skip
              </Typography>
            )}
          </Box>
          <Box
            style={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "center",
            }}
          ></Box>
        </Paper>
      </Grid>
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
    </Box>
  );

  async function handleImg(artist, blob) {
    console.log(artist.assetCanisterId.toText());
    const actor = await service._storeActor(artist.assetCanisterId);
    console.log("[ACTOR STORE] => ", actor);
    const chunkSize = 500000;
    const batchId = await actor.create_batch({});
    console.log("[BATCH_ID] => ", batchId);
    const chunkIds = [];
    for (let i = 0; i < blob.length; i += chunkSize) {
      console.log("[INDEX] => ", i);
      const chunk = blob.slice(i, i + chunkSize);
      const chunkId = await actor.create_chunk({
        batch_id: parseInt(batchId.batch_id),
        content: chunk,
      });
      console.log("[CHUNK ID] => ", chunkId);

      chunkIds.push(parseInt(chunkId.chunk_id));
    }
    console.log("[CHUNKS IDS] => ", chunkIds);

    const result = await actor.commit_batch({
      batch_id: parseInt(batchId.batch_id),
      operations: [
        {
          CreateAsset: {
            key: "KEY",
            content_type: "image/jpeg",
          },
        },
        {
          SetAssetContent: {
            key: "KEY",
            sha256: [],
            chunk_ids: chunkIds,
            content_encoding: "identity",
          },
        },
      ],
    });
    console.log(["CREATE ASSET AND ASSET CONTENT => "], result);
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
}

export default ArtForm;
