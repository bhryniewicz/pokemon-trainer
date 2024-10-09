import { Typography } from "@mui/material";
import { ZodIssue } from "zod";

export const ErrorMessages = ({ errors }: { errors: Array<string> }) => {
  if (errors.length === 0) return null;

  const text = errors.join(", ");

  return (
    <Typography variant="h6" color="error" sx={{ fontSize: "10px" }}>
      {text}
    </Typography>
  );
};

export const findErrors = (fieldName: string, errors: Array<ZodIssue>) => {
  return errors
    .filter((error) => {
      return error.path.includes(fieldName);
    })
    .map((error) => error.message);
};
