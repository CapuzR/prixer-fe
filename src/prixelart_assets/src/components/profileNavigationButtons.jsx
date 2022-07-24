import React from "react";
import * as React from "react";
import { Box, Button } from "@mui/material";
import consts from "../consts";

const ProfileNavigationButtons = ({ isMobile, screen, handleScreen }) => {
  return (
    <Box
      style={{
        marginTop: 16,
        display: "flex",
        marginLeft: !isMobile ? 16 : "auto",
        marginRight: !isMobile ? 16 : "auto",
        maxWidth: isMobile && 600,
      }}
    >
      <Box style={{ width: "25%", paddingRight: 8 }}>
        <Button
          //   disabled={isLoading}
          style={{
            borderRadius: 0,
            textTransform: "inherit",
            background: screen === consts.PROFILE_SCREEN_ART && "white",
            color: screen === consts.PROFILE_SCREEN_ART && "#000000",
            borderBottom:
              screen === consts.PROFILE_SCREEN_ART && "2px solid #000000",
          }}
          fullWidth
          onClick={() => handleScreen(consts.PROFILE_SCREEN_ART)}
        >
          Posts
        </Button>
      </Box>
      <Box style={{ width: "25%", paddingRight: 8 }}>
        <Button
          //   disabled={isLoading}
          style={{
            borderRadius: 0,
            textTransform: "inherit",
            background: screen === consts.PROFILE_SCREEN_COLLECTIONS && "white",
            color: screen === consts.PROFILE_SCREEN_COLLECTIONS && "#000000",
            borderBottom:
              screen === consts.PROFILE_SCREEN_COLLECTIONS &&
              "2px solid #000000",
          }}
          fullWidth
          onClick={() => handleScreen(consts.PROFILE_SCREEN_COLLECTIONS)}
        >
          Collections
        </Button>
      </Box>
      <Box style={{ width: "25%", paddingRight: 8 }}>
        <Button
          //   disabled={isLoading}
          style={{
            borderRadius: "0px",
            textTransform: "inherit",
            background: screen === consts.PROFILE_SCREEN_SERVICES && "white",
            color: screen === consts.PROFILE_SCREEN_SERVICES && "#000000",
            borderBottom:
              screen === consts.PROFILE_SCREEN_SERVICES && "2px solid #000000",
          }}
          fullWidth
          onClick={() => handleScreen(consts.PROFILE_SCREEN_SERVICES)}
        >
          Services
        </Button>
      </Box>
      <Box style={{ width: "25%", paddingRight: 0 }}>
        <Button
          //   disabled={isLoading}
          fullWidth
          style={{
            textTransform: "inherit",
            borderRadius: 0,
            background: screen === consts.PROFILE_SCREEN_GALLERIES && "white",
            color: screen === consts.PROFILE_SCREEN_GALLERIES && "#000000",
            borderBottom:
              screen === consts.PROFILE_SCREEN_GALLERIES && "2px solid #000000",
          }}
          onClick={() => handleScreen(consts.PROFILE_SCREEN_GALLERIES)}
        >
          Galleries
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileNavigationButtons;
