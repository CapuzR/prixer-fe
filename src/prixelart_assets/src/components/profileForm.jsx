import React from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

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
        <IconButton component="label">
          <Avatar
            src={avatar && avatar}
            style={{ width: "120px", height: "120px" }}
          />
          <input
            hidden
            type="file"
            onChange={(event) => handleChange(event, true)}
          />
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
  );
}

export default ProfileForm;
