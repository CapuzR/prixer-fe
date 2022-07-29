import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddGallery from "./pages/addGallery.jsx";
import AddPost from "./pages/addPost.jsx";
import AddService from "./pages/addService.jsx";
import Explore from "./pages/explore.jsx";
import Feed from "./pages/feed.jsx";
import GalleryDetails from "./pages/galleryDetails.jsx";

import Login from "./pages/login.jsx";
import PostsDetails from "./pages/postDetails.jsx";
import Profile from "./pages/profile.jsx";
import Registry from "./pages/registry.jsx";
import Settings from "./pages/settings.jsx";

export const AppRouter = ({ isMobile }) => {
  console.log(localStorage.getItem("wallet"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login isMobile={isMobile} />} />
        <Route path="/registry" element={<Registry isMobile={isMobile} />} />
        <Route path="/u/:username" element={<Profile isMobile={isMobile} />} />
        <Route path="/feed" element={<Feed isMobile={isMobile} />} />
        <Route path="/explore" element={<Explore isMobile={isMobile} />} />
        <Route path="/form/post" element={<AddPost isMobile={isMobile} />} />
        <Route
          path="/form/gallery"
          element={<AddGallery isMobile={isMobile} />}
        />
        <Route
          path="/form/service"
          element={<AddService isMobile={isMobile} />}
        />
        <Route
          path="/post/:postId/details"
          element={<PostsDetails isMobile={isMobile} />}
        />
        <Route
          path="/gallery/:galleryId/details"
          element={<GalleryDetails isMobile={isMobile} />}
        />
        <Route path="/settings" element={<Settings isMobile={isMobile} />} />
      </Routes>
    </Router>
  );
};
