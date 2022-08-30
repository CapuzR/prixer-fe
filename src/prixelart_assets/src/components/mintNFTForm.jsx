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
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MintNFTForm({ isMobile, onBack, mintNFT, isLoading }) {
  const [avatar, setAvatar] = useState(undefined);
  const [avatarAsset, setAvatarAsset] = useState(undefined);
  const [name, setName] = useState("");
  const [typeAvatar, setTypeAvatar] = useState();

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
    setTypeAvatar(file.type);
    setAvatarAsset(data);
    setAvatar(resizedString);
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
        <Box style={{ width: isMobile ? "20%" : "10%" }}>
          <IconButton
            color="primary"
            onClick={() => onBack()}
            disabled={isLoading}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
        </Box>
        <Box
          style={{
            display: "flex",

            width: "100%",
          }}
        >
          <Typography
            style={{ margin: "auto" }}
            variant={isMobile ? "h5" : "h4"}
          >
            {`Mint NFT`}
          </Typography>
        </Box>
        <Box style={{ marginLeft: "auto" }}>
          <Button
            style={{
              color: "#5DBB63",
              width: isMobile ? "20%" : "10%",
            }}
            disabled={isLoading}
            onClick={() =>
              mintNFT({
                payload: {
                  Payload: avatarAsset,
                },
                contentType: typeAvatar,
                owner: [],
                properties: [
                  {
                    name: name,
                    value: { Int: 5 },
                    immutable: true,
                  },
                ],
                isPrivate: false,
              })
            }
          >
            Mint
          </Button>
        </Box>
      </Box>
      <Paper elevation={1} style={{ padding: "24px" }}>
        <Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <IconButton component="label">
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                disabled={isLoading}
                type="text"
                label="Name"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default MintNFTForm;
