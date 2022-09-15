import React from "react";
import * as React from "react";
import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "../../components_old/navbar.jsx";

const MobileView = ({ onLoginStoic, onLoginPlug, isLoading }) => {
  return (
    <Box
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1644256086122-7988468e2545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTE5NzQxNg&ixlib=rb-1.2.1&q=80&w=1080')",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Navbar onLogout={console.log} isAuth={true} />

      <Box style={{ paddingTop: 60 }}>
        <Box
          style={{
            height: `calc(100vh - ${60}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Button
              disabled={isLoading}
              variant="contained"
              color="primary"
              style={{
                textTransform: "capitalize",
                marginRight: 8,
                borderRadius: 8,
                width: 150,
                maxHeight: 36.5,
                background: "#2D2D2D",
              }}
              onClick={() => onLoginStoic()}
            >
              {isLoading ? (
                <CircularProgress style={{ color: "#FFFFFF" }} size={24} />
              ) : (
                "Connect stoic"
              )}
            </Button>
            {/* <PlugConnect
              whitelist={["canister-id"]}
              onConnectCallback={() => console.log("Some callback")}
            /> */}
            {/* <Button
              variant="contained"
              style={{ textTransform: "capitalize", borderRadius: 10 }}
              onClick={() => onLoginPlug()}
            >
              Connect stoic
            </Button> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileView;
