import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "../pages/auth";
import Registry from "../pages/auth/registry";
import AddArt from "../pages/main/addArt";
import Main from "../pages/main/index";
import Profile from "../pages/main/profile";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/main" element={<Main />} />
        <Route path="/u/:username" element={<Profile />} />
        <Route path="/addArt" element={<AddArt />} />

        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </Router>
  );
};
