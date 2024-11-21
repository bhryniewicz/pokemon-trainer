import { Components, Theme } from "@mui/material";

export const MuiListItem: Components<Theme>["MuiListItem"] = {
  styleOverrides: {
    root: {
      padding: "0",
      fontSize: "12px",
    },
  },
};
