"use client";

import { createTheme, Theme } from "@mui/material";
import { IBMFont } from "./localFonts";

export const theme: Theme = createTheme({
  typography: {
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
          fontSize: "14px",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: "0",
          fontSize: "12px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          color: "#2A2A2A",
        },
      },
    },
  },
  palette: {
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
