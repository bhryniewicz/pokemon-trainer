import { Components, Theme } from "@mui/material";

export const MuiInputLabel: Components<Theme>["MuiInputLabel"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary,
      fontSize: "0.75rem",
      paddingBottom: "0.25rem",
    }),
  },
};
