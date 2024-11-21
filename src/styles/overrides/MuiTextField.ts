import { Components, Theme } from "@mui/material";

export const MuiTextField: Components<Theme>["MuiTextField"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: "0.25rem",
        fontSize: "14px",
      },
    }),
  },
};
