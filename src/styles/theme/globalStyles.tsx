"use client";

import { GlobalStyles } from "@mui/material";

export const globalStyles = (
  <GlobalStyles
    key={crypto.randomUUID()}
    styles={() => ({
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
    })}
  />
);
