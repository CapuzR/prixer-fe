import React from "react";
import * as React from "react";
import { Box, Button } from "@mui/material";
import PlugConnect from "@psychedelic/plug-connect";

import Navbar from "../../components_old/navbar.jsx";

const DesktopView = ({ onLogin, onLoginStoic, onLoginPlug }) => {
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
              variant="contained"
              style={{
                textTransform: "capitalize",
                marginRight: 8,
                borderRadius: 8,
              }}
              onClick={() => onLoginStoic()}
            >
              Connect stoic
            </Button>
            <PlugConnect
              dark
              whitelist={[
                "rkp4c-7iaaa-aaaaa-aaaca-cai",
                "rrkah-fqaaa-aaaaa-aaaaq-cai",
              ]}
              onConnectCallback={() => alert("PASE")}
            />
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

export default DesktopView;
