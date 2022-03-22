import React from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function HandleProfileForms({ isViewProfile, handleView }) {
  return (
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
          background: !isViewProfile && "white",
          color: !isViewProfile && "black",
        }}
        onClick={() => handleView(true)}
        fullWidth
      >
        Basics
      </Button>
      <Button
        fullWidth
        variant="contained"
        style={{
          textTransform: "capitalize",
          fontSize: "12px",
          background: isViewProfile && "white",
          color: isViewProfile && "black",
        }}
        onClick={() => handleView(false)}
      >
        Cameras & Lenses
      </Button>
    </Box>
  );
}

export default HandleProfileForms;
