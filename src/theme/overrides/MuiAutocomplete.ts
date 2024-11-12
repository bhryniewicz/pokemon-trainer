import { Components, Theme } from "@mui/material";

export const MuiAutocomplete: Components<Theme>["MuiAutocomplete"] = {
  styleOverrides: {
    listbox: ({ theme }) => ({
      color: theme.palette.grey[100],
    }),
  },
};
