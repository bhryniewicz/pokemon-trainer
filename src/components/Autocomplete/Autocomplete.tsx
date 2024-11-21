import { PokemonOption } from "@/types/pokemon";
import { Autocomplete, TextField } from "@mui/material";
import { FC, memo } from "react";
import { useFormContext } from "react-hook-form";

interface AutocompleteProps {
  filteredOptions: Array<PokemonOption>;
  setSearchPhrase: (value: string) => void;
  searchPhrase: string;
  isLoading: boolean;
}

export const AutocompleteComponent: FC<AutocompleteProps> = ({
  filteredOptions,
  setSearchPhrase,
  searchPhrase,
  isLoading,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Autocomplete
      loading={isLoading}
      inputValue={searchPhrase}
      value={watch("pokemonName") || ""}
      fullWidth
      options={filteredOptions.map((entry) => entry.label) || []}
      onChange={(_, value) => {
        setValue("pokemonName", value);
      }}
      onInputChange={(_, value) => {
        setSearchPhrase(value);
      }}
      filterOptions={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          id="pokemonName"
          placeholder="Choose"
          autoComplete="off"
          error={Boolean(errors.pokemonName)}
          helperText={
            errors.pokemonName && errors.pokemonName?.message?.toString()
          }
        />
      )}
    />
  );
};

export const AutoComplete = memo(AutocompleteComponent);
