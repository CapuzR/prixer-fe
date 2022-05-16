import React from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";

function ProfileForm({
  avatar,
  handleChange,
  username,
  setUsername,
  displayName,
  setDisplayName,
  givenName,
  setGivenName,
  familyName,
  setFamilyName,
  location,
  setLocation,
  about,
  setAbout,
  email,
  setEmail,
  phone,
  setPhone,
  artType,
  setArtType,
  isLoading,
  regexForEmail,
  regexForPhone,
  regexForName,
  imageProfile,
}) {
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <IconButton component="label" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Avatar
                src={imageProfile}
                style={{ width: "120px", height: "120px" }}
              />
              <input
                hidden
                type="file"
                onChange={(event) => handleChange(event, true)}
              />
            </>
          )}
        </IconButton>
      </Box>
      <Grid container spacing={1} style={{ marginTop: "32px" }}>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
          <TextField
            disabled={isLoading}
            required
            type="text"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
          <TextField
            disabled={isLoading}
            required
            type="text"
            label="Display name"
            variant="outlined"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
          <TextField
            disabled={isLoading}
            required
            type="text"
            label="Given name"
            value={givenName}
            onChange={(event) => {
              if (!regexForName.test(event.target.value)) {
                return false;
              } else {
                setGivenName(event.target.value);
              }
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
          <TextField
            disabled={isLoading}
            required
            type="text"
            label="Family name"
            onChange={(event) => {
              if (!regexForName.test(event.target.value)) {
                return false;
              } else {
                setFamilyName(event.target.value);
              }
            }}
            variant="outlined"
            value={familyName}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
          <TextField
            disabled={isLoading}
            required
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
            disabled={isLoading}
            required
            fullWidth
            type="text"
            label="Email"
            value={email}
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
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
              Formato no valido
            </div>
          )}
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={3}>
          <TextField
            disabled={isLoading}
            required
            fullWidth
            type="text"
            label="Phone"
            value={phone}
            onChange={(event) => {
              if (!regexForPhone.test(event.target.value)) {
                return false;
              } else {
                setPhone(event.target.value);
              }
            }}
            variant="outlined"
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
            disabled={isLoading}
            required
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
  );
}

export default ProfileForm;
