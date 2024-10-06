import { Button } from "@mui/material";
import { FC, ReactNode } from "react";

type ColorType = "primary" | "secondary";

interface ResetButtonProps {
  resetInputs: () => void;
  children: ReactNode;
  color: ColorType;
}

export const ResetButton: FC<ResetButtonProps> = ({
  resetInputs,
  children,
  color,
}) => {
  return (
    <Button variant="contained" color={color} onClick={resetInputs}>
      {children}
    </Button>
  );
};
