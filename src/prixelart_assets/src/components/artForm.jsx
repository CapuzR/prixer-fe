import React from "react";
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

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";

function ArtForm({
  isUpdate,
  setIsEditArt,
  setIsCreateArt,
  assetArt,
  handleChange,
  artTitle,
  setArtTitle,
  artType,
  setArtType,
  categories,
  artCategory,
  setArtCategory,
  artCamera,
  setArtCamera,
  artistTools,
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
  onCreateArt,
  onUpdateArt,
  artTypes,
  tools,
  galleries,
}) {
  return (
    <Box style={{ padding: 24 }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">
          {isUpdate ? "Edit art" : "Create art"}
        </Typography>

        <IconButton
          color="primary"
          onClick={() =>
            isUpdate ? setIsEditArt(false) : setIsCreateArt(false)
          }
          style={{ marginLeft: "auto" }}
        >
          <ArrowCircleLeftOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
        <Paper
          elevation={5}
          style={{ padding: 24, marginTop: 14, width: "100%" }}
        >
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              style={{ textAlign: "center" }}
            >
              {assetArt ? (
                <Button component="label">
                  <img
                    src={assetArt}
                    alt="image"
                    srcSet={`${assetArt}`}
                    loading="lazy"
                    style={{
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      display: "block",
                      width: "100%",
                      maxHeight: "232px",
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
                  <AddPhotoAlternateIcon style={{ height: 230, width: 80 }} />
                  <input
                    type="file"
                    hidden
                    onChange={(event) => handleChange(event, false)}
                  />
                </Button>
              )}
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
                      {artTypes?.map((type) => (
                        <MenuItem value={type.id} key={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box style={{ display: "flex" }}>
                <Box style={{ width: "50%", marginRight: 4 }}>
                  <FormControl style={{ marginBottom: 4 }} required fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category-select"
                      value={""}
                      label="Category"
                      value={artCategory}
                      onChange={(event) => setArtCategory(event.target.value)}
                    >
                      {categories?.map((type) => (
                        <MenuItem value={type.id} key={type.id}>
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
                      value={artCamera}
                      onChange={(event) => setArtCamera(event.target.value)}
                      label="Camera"
                    >
                      {artistTools?.map(
                        (art) =>
                          tools.find((tl) => art.id === tl.id) &&
                          art.category.name === "Camera" && (
                            <MenuItem key={art.id} value={art.id}>
                              {art.name}
                            </MenuItem>
                          )
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <Box style={{ width: "50%" }}>
                  <FormControl style={{ marginBottom: 4 }} fullWidth>
                    <InputLabel id="camera-label">Lens</InputLabel>
                    <Select
                      labelId="camera-label"
                      id="category-select"
                      value={lensArt}
                      onChange={(event) => setLensArt(event.target.value)}
                      label="Lens"
                    >
                      {artistTools?.map(
                        (art) =>
                          tools.find((tl) => art.id === tl.id) &&
                          art.category.name === "Lens" && (
                            <MenuItem key={art.id} value={art.id}>
                              {art.name}
                            </MenuItem>
                          )
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControl style={{ marginBottom: 4 }} fullWidth>
                <InputLabel id="gallery-label">Gallery</InputLabel>
                <Select
                  labelId="gallery-label"
                  id="gallery-select"
                  value={galleryArt}
                  onChange={(event) => setGalleryArt(event.target.value)}
                  label="Labels"
                >
                  {galleries?.map((gallery) => (
                    <MenuItem value={gallery.id}>{gallery.info.name}</MenuItem>
                  ))}
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
                value={aboutArt}
                onChange={(event) => setAboutArt(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                placeholder="labels"
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
          <Box style={{ marginTop: 12 }}>
            <Button
              variant="outlined"
              onClick={() => {
                if (isUpdate) {
                  onUpdateArt();
                } else {
                  onCreateArt();
                }
              }}
            >
              {isUpdate ? "Update" : "Create"}
            </Button>
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
    </Box>
  );
}

export default ArtForm;
