import React, { useState, useEffect, forwardRef } from "react";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import CircularProgress from "@mui/material/CircularProgress";

import service from "../service";
import Navbar from "../../components_old/navbar";
import GalleryDetailList from "../../components_old/galleryDetail";

function GalleryDetails() {
  const toolbarHeight = 68;
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState();
  const [galleries, setGalleries] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      await Promise.all([
        service.readPostsByGallery(params.galleryId),
        service.getGalleriesByArtist(params.username),
      ])
        .then(([posts, galleries]) => {
          setPosts(posts.ok);
          setGalleries(galleries.ok);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("[ERROR GALLERIES DETAILS] => ", err);
          setIsLoading(false);
        });
    }
    init();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box
        style={{ paddingTop: toolbarHeight, maxWidth: 1000, margin: "auto" }}
      >
        {posts ? (
          <GalleryDetailList
            navigate={navigate}
            posts={posts}
            galleries={galleries}
            galleryId={params.galleryId}
          />
        ) : (
          <Box
            style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </div>
  );

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }
}

export default GalleryDetails;
