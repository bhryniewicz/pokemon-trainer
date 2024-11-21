"use client";

import * as components from "@/styles/overrides";
import { createTheme, Theme } from "@mui/material";
import { IBMFont } from "./localFonts";

const typography = {
  fontFamily: IBMFont.style.fontFamily,
  body2: {
    fontSize: "12px",
  },
  body1: {
    fontSize: "14px",
  },
  h6: {
    fontSize: "10px",
  },
};

export const darkTheme: Theme = createTheme({
  typography,
  components,
  palette: {
    background: {
      default: "#242038",
    },
    text: {
      primary: "#eeeeee",
    },
    primary: {
      main: "#8D86C9",
      dark: "#CAC4CE",
      light: "#332c57",
    },
    secondary: {
      light: "#2A2A2A",
      main: "#CAC4CE",
    },
    grey: {
      "100": "#2A2A2A",
      "200": "#CAC4CE",
      "300": "#E4E4E4",
      "400": "#eeeeee",
    },
    error: {
      main: "#FF4E4E",
    },
  },
});

export const lightTheme: Theme = createTheme({
  typography,
  components,
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#9747FF",
      dark: "#7135BF",
      light: "#9747FF40",
    },
    secondary: {
      light: "#2A2A2A",
      main: "#EEEEEE",
    },
    grey: {
      "100": "#2A2A2A",
      "200": "#7F7F7F",
      "300": "#E4E4E4",
      "400": "#EEEEEE",
    },
    error: {
      main: "#FF4E4E",
    },
  },
});
