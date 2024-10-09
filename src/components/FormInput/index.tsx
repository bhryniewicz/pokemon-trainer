import { FC, ReactNode } from "react";
import { InputLabel, Input, Box, useTheme } from "@mui/material";

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
    <Box>
      <InputLabel>{label}</InputLabel>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        value={value}
        disableUnderline
        placeholder={placeholder}
        name={name}
        sx={{
          width: "100%",
          border: `1px solid ${theme.palette.grey[400]}`,
          padding: "14px 10px",
          borderRadius: "4px",
          mb: 0.5,
          "& .MuiInput-input": {
            width: "210px",
            padding: "0",
          },
        }}
      />
      {error}
    </Box>
  );
};
