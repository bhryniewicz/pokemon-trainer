import { Components, Theme } from "@mui/material";

export const MuiButton: Components<Theme>["MuiButton"] = {
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
};
