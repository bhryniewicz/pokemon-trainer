import { Components, Theme } from "@mui/material";

export const MuiInput: Components<Theme>["MuiInput"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      border: `1px solid ${theme.palette.grey[400]}`,
      padding: "14px",
      borderRadius: "0.25rem",
    }),
  },
};
