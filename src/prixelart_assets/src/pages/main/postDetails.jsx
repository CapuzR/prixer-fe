import React, { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";

import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

import Navbar from "../../components/navbar";
import ArtDetail from "../../components/artDetail";
import service from "../service";
import { CircularProgress } from "../../../../../node_modules/@mui/material/index";
import ArtForm from "../../components/artForm";

function PostDetails() {
  const toolbarHeight = 68;
  const navigate = useNavigate();
  const params = useParams();
  const theme = useTheme();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const mobileBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  const [isEditPost, setIsEditPost] = useState(false);

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
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const post = await service.getPostByID(params.postId);
      console.log(post);

      setPost(post.ok);
      setIsLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    if (isEditPost) {
      setArtTitle(post?.post?.postBasics?.title);
    }
  }, [isEditPost]);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight }}>
        {isLoading ? (
          <Box style={{ marginTop: 120, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : !isEditPost ? (
          <ArtDetail
            post={post}
            navigate={navigate}
            mobileBreakpoint={mobileBreakpoint}
            setPost={setPost}
            setIsEditPost={setIsEditPost}
          />
        ) : (
          <ArtForm
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
            isUpdate={true}
            setIsEditPost={setIsEditPost}
          />
        )}
      </Box>
    </div>
  );

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

export default PostDetails;
