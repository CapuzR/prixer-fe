import React from "react";
import * as React from "react";
import ReactDOM from "react-dom";

import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import { AppRouter } from "./router.jsx";
import { PrixerProvider } from "./context/provider";
import "./app.css";

function PrixerApp() {
  const themeQuery = useTheme();
  const mobileBreakpoint = useMediaQuery(themeQuery.breakpoints.up("md"));
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2D2D2D",
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PrixerProvider>
          <AppRouter isMobile={mobileBreakpoint ? false : true} />
        </PrixerProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default PrixerApp;
ReactDOM.render(<PrixerApp />, document.querySelector("#app"));
