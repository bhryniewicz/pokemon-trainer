import { Box, Input, InputLabel, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface PokemonTrainerInputProps {
  name: string;
  placeholder: string;
  label: string;
  error: ReactNode;
  value?: string;
  setValue: (value: string) => void;
}

export const FormInput: FC<PokemonTrainerInputProps> = ({
  name,
  placeholder,
  label,
  error,
  value,
  setValue,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        fullWidth
        value={value}
        disableUnderline
        placeholder={placeholder}
        name={name}
        sx={{
          mb: 0.5,

          "& .MuiInput-input": {
            padding: "0",
          },
        }}
      />
      {error}
    </Box>
  );
};
