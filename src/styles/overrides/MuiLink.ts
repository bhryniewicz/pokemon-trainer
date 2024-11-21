import { Components, Theme } from "@mui/material";

export const MuiLink: Components<Theme>["MuiLink"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontSize: "1rem",

      "&:hover": {
        color: theme.palette.secondary.main,
      },
    }),
  },
};
