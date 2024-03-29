import React, { useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Loading from "../../components_old/loading";
import service from "../service";
import Navbar from "../../components_old/navbar";

const toolbarHeight = 68;

function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSignInStoic = async () => {
    setIsLoading(true);
    const identity = await service.onSignInStoic();
    if (identity) {
      localStorage.setItem("wallet", "Stoic");
      const artist = await service.getArtist();
      if (artist.length > 0) {
        const parseArtist = service.parseArtist(artist);
        localStorage.setItem("username", parseArtist.username);
        localStorage.setItem("fullname", parseArtist.fullName);

        navigate("/explore");
      } else {
        navigate("/registry");
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert("stoic auth err!");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1644256086122-7988468e2545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0NTE5NzQxNg&ixlib=rb-1.2.1&q=80&w=1080')",
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <Navbar
          onLogout={console.log}
          toolbarHeight={toolbarHeight}
          isAuth={true}
        />

        <Box style={{ paddingTop: toolbarHeight }}>
          <Box
            style={{
              height: `calc(100vh - ${toolbarHeight}px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                variant="contained"
                style={{ textTransform: "capitalize" }}
                onClick={() => onSignInStoic()}
              >
                Connect stoic
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Auth;
