import { defaultAutocompleteValue } from "@/components/Form/values";
import { getSearchedPokemons } from "@/db/server/getSearchedPokemons";
import { useDebounce } from "@/hooks/useDebounce";
import { PokemonOption } from "@/types/pokemon";
import { Autocomplete, Input, InputLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, ReactNode, memo, useState } from "react";

interface AutocompleteProps {
  error: ReactNode;
  selectedOption: PokemonOption;
  setSelectedOption: (value: PokemonOption) => void;
}

export const AutocompleteComponent: FC<AutocompleteProps> = ({
  error,
  selectedOption,
  setSelectedOption,
}) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

  const { data: filteredOptions, isLoading } = useQuery({
    queryKey: ["searched-pokemon", debouncedSearchPhrase],
    queryFn: async () => await getSearchedPokemons(debouncedSearchPhrase),
    initialData: [],
    staleTime: 0,
    enabled: debouncedSearchPhrase !== "",
  });

  return (
    <>
      <InputLabel>Pokemon name</InputLabel>
      <Autocomplete
        sx={(theme) => ({
          "& .MuiInputLabel-root": {
            color: theme.palette.grey[200],
          },
        })}
        loading={isLoading}
        inputValue={searchPhrase}
        value={selectedOption}
        fullWidth
        options={filteredOptions}
        onChange={(_, value) => {
          setSelectedOption(value ?? defaultAutocompleteValue);
        }}
        onInputChange={(_, value) => {
          setSearchPhrase(value);
        }}
        filterOptions={(options) => {
          options = filteredOptions;
          return options;
        }}
        renderInput={(params) => (
          <Input
            fullWidth
            sx={{
              marginBottom: "0.25rem",

              "& .MuiInput-input": {
                padding: "14px 10px !important",
              },
            }}
            name="pokemon"
            disableUnderline
            placeholder={"Choose"}
            ref={params.InputProps.ref}
            inputProps={{ ...params.inputProps }}
          />
        )}
      />
      {error}
    </>
  );
};

export const AutoComplete = memo(AutocompleteComponent);
