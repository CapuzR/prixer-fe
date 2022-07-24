import React from "react";
import * as React from "react";

import { Box } from "@mui/material";

const Banner = ({ banner }) => {
  return (
    <Box
      style={{
        display: "flex",
        height: 100,
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        alignItems: "flex-start",
      }}
    >
      {/* <IconButton
          disabled={isLoadingChangeBanner}
          size="small"
          style={{ marginLeft: "auto", backgroundColor: "#C5C5C5" }}
          component="label"
        >
          {isLoadingChangeBanner ? (
            <CircularProgress size={32} />
          ) : (
            <EditIcon fontSize="small" color="primary" />
          )}
          <input
            type="file"
            hidden
            onChange={(event) => handleChangeBanner(event)}
          />
        </IconButton> */}
    </Box>
  );
};

export default Banner;
