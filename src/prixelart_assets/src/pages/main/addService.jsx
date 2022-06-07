import React, { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import ServiceForm from "../../components/serviceForm";

function AddService() {
  const toolbarHeight = 68;
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar onLogout={onLogout} toolbarHeight={toolbarHeight} />
      <Box style={{ paddingTop: toolbarHeight }}>
        <ServiceForm navigate={navigate} />
      </Box>
    </div>
  );

  function onLogout() {
    service.onSignOutStoic();
    localStorage.clear();
    navigate("/login");
  }
}

export default AddService;
