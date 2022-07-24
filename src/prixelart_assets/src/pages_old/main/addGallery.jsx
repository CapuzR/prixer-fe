import React, { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

import service from "../service";
import Navbar from "../../components_old/navbar";
import GalleryForm from "../../components_old/galleryForm";

function AddGallery() {
  const toolbarHeight = 68;
  const navigate = useNavigate();
  const [titleGallery, setTitleGallery] = useState("");
  const [aboutGallery, setAboutGallery] = useState("");
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    async function init() {}
    init();
  }, []);
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight }}>
        <GalleryForm
          navigate={navigate}
          titleGallery={titleGallery}
          setTitleGallery={setTitleGallery}
          aboutGallery={aboutGallery}
          setAboutGallery={setAboutGallery}
          galleries={galleries}
          service={service}
        />
      </Box>
    </div>
  );

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }
}

export default AddGallery;
