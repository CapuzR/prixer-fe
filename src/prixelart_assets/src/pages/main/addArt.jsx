import React, { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { readAndCompressImage } from "browser-image-resizer";

import service from "../service";
import Navbar from "../../components/navbar";
import ArtForm from "../../components/artForm";

function AddArt() {
  const toolbarHeight = 68;
  const navigate = useNavigate();
  const [artist, setArtist] = useState();
  const [isLoading, setIsLoading] = useState(false);
  ///FORM ART
  const [artTitle, setArtTitle] = useState("");
  const [artType, setArtType] = useState("");
  const [artCamera, setArtCamera] = useState("");
  const [artCategory, setArtCategory] = useState("");
  const [lensArt, setLensArt] = useState("");
  const [tagsArt, setTagsArt] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [aboutArt, setAboutArt] = useState("");
  const [galleryArt, setGalleryArt] = useState("");
  const [artLocation, setArtLocation] = useState("");
  const [asset, setAsset] = useState();
  const [blob, setBlob] = useState();
  const [galleries, setGalleries] = useState();
  //   const [titleGallery, setTitleGallery] = useState("");
  //   const [aboutGallery, setAboutGallery] = useState("");

  useEffect(() => {
    async function init() {
      await Promise.all([
        service.getArtist(),
        service.getGalleriesByArtist(localStorage.getItem("username")),
      ])
        .then(([artist, galleries]) => {
          const parseArtist = service.parseArtist(artist);
          setGalleries(galleries.ok);
          setArtist(parseArtist);
        })
        .catch(console.log);
    }
    init();
  }, []);

  console.log(galleries);
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight }}>
        <ArtForm
          blob={blob}
          artist={artist}
          navigate={navigate}
          asset={asset}
          handleChange={handleChange}
          artTitle={artTitle}
          setArtTitle={setArtTitle}
          artType={artType}
          setArtType={setArtType}
          artCategory={artCategory}
          setArtCategory={setArtCategory}
          artCamera={artCamera}
          setArtCamera={setArtCamera}
          lensArt={lensArt}
          setLensArt={setLensArt}
          galleryArt={galleryArt}
          setGalleryArt={setGalleryArt}
          aboutArt={aboutArt}
          setAboutArt={setAboutArt}
          tagValue={tagValue}
          setTagValue={setTagValue}
          addTags={addTags}
          tagsArt={tagsArt}
          setTagsArt={setTagsArt}
          onUpdateArt={console.log}
          service={service}
          artLocation={artLocation}
          setArtLocation={setArtLocation}
          galleries={galleries}
        />
      </Box>
    </div>
  );

  function convertToBase64(blob) {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async function handleChange(event) {
    const file = event.target.files[0];

    const config = {
      quality: 1,
      maxWidth: 640,
      maxHeight: 640,
      autoRotate: true,
      debug: true,
    };

    const resizedImage = await readAndCompressImage(file, config);
    const resizedString = await convertToBase64(file);
    const data = [...new Uint8Array(await file.arrayBuffer())];

    setBlob(data);

    setAsset(resizedString);
  }

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }

  function addTags(currentTag) {
    if (tagsArt.find((tag) => tag === currentTag)) {
      setIsSnackbarOpen(true);
      setSeverity("error");
      setMessage("Item already exist");
    } else {
      setTagsArt([...tagsArt, currentTag]);
      setTagValue("");
    }
  }
}

export default AddArt;
