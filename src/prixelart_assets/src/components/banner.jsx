import React from "react";
import * as React from "react";
import { readAndCompressImage } from "browser-image-resizer";

import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { service } from "../service";
import consts from "../consts";

const Banner = ({ banner, artist, updateArtist, setBanner }) => {
  const convertToBase64 = (blob) => {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleChangeBanner = async (event) => {
    const file = event.target.files[0];

    let config = {
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
      autoRotate: true,
      debug: true,
    };

    let resizedImage = await readAndCompressImage(file, config);

    while (resizedImage.size > 25000) {
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
    setBanner(resizedString);
    const data = [...new Uint8Array(await resizedImage.arrayBuffer())];
    const parseCameras = artist.cameras.map((camera) => {
      return {
        Text: camera.Text,
      };
    });
    const parseLens = artist.lens.map((lens) => {
      return {
        Text: lens.Text,
      };
    });
    updateArtist({
      description: "Artista de prueba",
      details: [
        ["firstName", { Text: artist.firstName }],
        ["lastName", { Text: artist.lastName }],
        ["artType", { Text: artist.artType }],
        ["username", { Text: artist.username }],
        ["displayName", { Text: artist.displayName }],
        // ["avatarAsset", { Vec: { False: null } }],
        ["bannerAsset", { Vec: [{ Slice: data }, { True: null }] }],
        // ["canisterId", { Principal: artist.canisterId }],
        // ["assetCanId", { Principal: artist.assetCanisterId }],
        ["location", { Text: artist.location }],
        ["email", { Text: artist.email }],
        ["phone", { Text: artist.phone }],
        ["about", { Text: artist.about }],
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
      thumbnail: service.getUrl(
        consts.ASSET_CANISTER_ID_ARTIST,
        `A${JSON.parse(localStorage.getItem("_scApp")).principal}`
      ),
      frontend: [],
      name: `${artist.fullName}`,
      principal_id: JSON.parse(localStorage.getItem("_scApp")).principal,
    });
  };

  return (
    <Box
      style={{
        display: "flex",
        height: 100,
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        alignItems: "flex-start",
        padding: 8,
      }}
    >
      <IconButton
        size="small"
        style={{ marginLeft: "auto", backgroundColor: "#C5C5C5" }}
        component="label"
      >
        {/* {isLoadingChangeBanner ? (
            <CircularProgress size={32} />
          ) : ( */}
        <EditIcon fontSize="small" color="primary" />
        {/* )} */}
        <input
          type="file"
          hidden
          onChange={(event) => handleChangeBanner(event)}
        />
      </IconButton>
    </Box>
  );
};

export default Banner;
