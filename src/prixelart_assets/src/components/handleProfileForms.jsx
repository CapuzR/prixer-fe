import React from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import consts from "../consts/index";

function HandleProfileForms({ editProfileScreen, handleView, isLoading }) {
  return (
    <Box
      style={{
        marginTop: "32px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        disabled={isLoading}
        variant="contained"
        style={{
          marginRight: "4px",
          textTransform: "capitalize",
          fontSize: "12px",
          background:
            editProfileScreen !== consts.UPDATE_ARTIST_SCREEN_USER && "white",
          color:
            editProfileScreen !== consts.UPDATE_ARTIST_SCREEN_USER && "black",
        }}
        onClick={() => handleView(consts.UPDATE_ARTIST_SCREEN_USER)}
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
          background:
            editProfileScreen === consts.UPDATE_ARTIST_SCREEN_USER && "white",
          color:
            editProfileScreen === consts.UPDATE_ARTIST_SCREEN_USER && "black",
        }}
        onClick={() => handleView(consts.UPDATE_ARTIST_SCREEN_TOOLS)}
      >
        Cameras & Lenses
      </Button>
    </Box>
  );
}

export default HandleProfileForms;
