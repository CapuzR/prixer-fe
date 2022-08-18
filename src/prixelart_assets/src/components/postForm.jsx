import React, { useState } from "react";
import * as React from "react";
import { readAndCompressImage } from "browser-image-resizer";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  InputAdornment,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
4
import AddBoxIcon from "@mui/icons-material/AddBox";

import { service } from "../service";
import consts from "../consts";

function PostForm({
  isMobile,
  isFirstArt,
  artist,
  onSkip,
  createPost,
  isUpdate = false,
  galleries,
  handleIsUpdatePost,
  post,
  updatePost,
}) {
  const navigate = useNavigate();
  const [artTitle, setArtTitle] = useState(
    post ? post.post.postBasics.title : ""
  );
  const [artCamera, setArtCamera] = useState(
    post
      ? post.post.postBasics.details.find((detail) => detail[0] === "camera")[1]
          .Vec[0].Text
      : ""
  );
  const [artCategory, setArtCategory] = useState(
    post ? post.post.postBasics.artCategory : ""
  );
  const [lensArt, setLensArt] = useState(
    post
      ? post.post.postBasics.details.find((detail) => detail[0] === "lens")[1]
          .Vec[0].Text
      : ""
  );
  const [tagsArt, setTagsArt] = useState(post ? post.post.postBasics.tags : []);
  const [tagValue, setTagValue] = useState("");
  const [aboutArt, setAboutArt] = useState(
    post ? post.post.postBasics.description : ""
  );
  const [galleryArt, setGalleryArt] = useState(
    post
      ? post.post.postBasics.details.find(
          (detail) => detail[0] === "galleryId"
        )[1].Text
      : ""
  );
  const [artLocation, setArtLocation] = useState(
    post
      ? post.post.postBasics.details.find(
          (detail) => detail[0] === "location"
        )[1].Text
      : ""
  );
  const [asset, setAsset] = useState(
    post
      ? service.getUrl(consts.ASSET_CANISTER_ID_SOCIALS, `${post.postId}`)
      : ""
  );
  const [artType, setArtType] = useState(
    post ? post.post.postBasics.artType : ""
  );
  const [blob, setBlob] = useState();

  const addTags = (currentTag) => {
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
  };

  const convertToBase64 = (blob) => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleChange = async (event) => {
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
  };

  const isDisabled = () => {
    return !artTitle ||
      !aboutArt ||
      !artType ||
      !artCamera ||
      !lensArt ||
      !asset ||
      !artCategory
      ? true
      : false;
  };

  return (
    <Box style={{ padding: 12 }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        {!isFirstArt && (
          <IconButton
            color="primary"
            onClick={() =>
              !isUpdate ? navigate(-1) : handleIsUpdatePost(false)
            }
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
        )}
        <Box
          style={{
            display: "flex",
            justifyContent: !isFirstArt && "center",
            width: "100%",
          }}
        >
          <Typography style={{}} variant={isMobile ? "h5" : "h4"}>
            {!isUpdate ? "Add post" : "Update post"}
          </Typography>
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <Button
            disabled={isDisabled()}
            style={{
              color: isDisabled() ? "#C5C5C5" : "#5DBB63",
            }}
            onClick={() => {
              if (isUpdate) {
                updatePost(
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
                  post.postId
                );
              } else {
                createPost(
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
              }
            }}
          >
            {!isUpdate ? "Create" : "Update"}
          </Button>
        </Box>
      </Box>
      <Paper elevation={1} style={{ padding: 24 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
                {!isUpdate && (
                  <input
                    type="file"
                    hidden
                    onChange={(event) => handleChange(event, false)}
                  />
                )}
              </Button>
            ) : (
              <Button fullWidth component="label">
                <AddPhotoAlternateIcon style={{ height: 184, width: 80 }} />
                {!isUpdate && (
                  <input
                    type="file"
                    hidden
                    onChange={(event) => handleChange(event, false)}
                  />
                )}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
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
          {!isFirstArt && (
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
                onDelete={() => setTagsArt(tagsArt.filter((tag) => tag !== tg))}
              />
            ))}
          </Box>
        </Grid>
        <Box style={{ marginTop: 8, display: "flex" }}>
          {isFirstArt && (
            <Typography
              style={{
                textDecoration: "underline",
                opacity: !artist && "0.3",
              }}
              variant="outlined"
              onClick={() => onSkip()}
              className="skyp-text"
            >
              Skip
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default PostForm;
