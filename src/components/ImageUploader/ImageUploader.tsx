import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

export const ImageUploader = () => {
  const {
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors.image?.message?.toString();
  const image = watch("image");

  const handleChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("image", e.target.files?.[0]);
    trigger("image");
  };

  return (
    <>
      <FormLabel>Trainer's image</FormLabel>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: `${
            Boolean(errors.image)
              ? `1px solid ${theme.palette.error.main}`
              : `1px solid ${theme.palette.text.primary}`
          }`,
          borderRadius: "4px",
          flexGrow: 1,
          minHeight: "300px",
        })}
      >
        <Button
          variant="contained"
          color="primary"
          component="label"
          sx={{ height: "30px", mb: 1 }}
        >
          Choose File
          <input
            type="file"
            name="file"
            hidden
            onChange={handleChangeInputFile}
          />
        </Button>
        <Typography variant="body2">{image?.name}</Typography>
        <FormHelperText error={Boolean(errors.image)}>
          {errorMessage}
        </FormHelperText>
      </Box>
    </>
  );
};
