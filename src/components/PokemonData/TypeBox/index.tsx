"use client";

import { Typography } from "@mui/material";

export const TypeBox = ({ name }: { name: string }) => {
  return (
    <Typography
      variant="body2"
      sx={(theme) => ({
        display: "inline-block",
        backgroundColor: theme.palette.primary.light,
        width: "min-content",
        p: 1,
        ml: 1,
        borderRadius: "1rem",
        textTransform: "capitalize",
      })}
    >
      {name}
    </Typography>
  );
};
