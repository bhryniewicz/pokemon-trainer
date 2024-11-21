import { Button } from "@mui/material";
import { FC } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={pending}
      sx={{ flexGrow: { xs: 1, sm: 0 } }}
    >
      {pending ? "Verifing informations" : "Submit"}
    </Button>
  );
};
