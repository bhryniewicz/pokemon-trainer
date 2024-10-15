import { defaultAutocompleteValue } from "@/components/Form/values";
import { PokemonOption } from "@/types/pokemon";
import { Autocomplete, Input, InputLabel } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode, memo, useEffect, useState } from "react";

interface AutocompleteProps {
  search: string;
  error: ReactNode;
  selectedOption: PokemonOption;
  setSelectedOption: (value: PokemonOption) => void;
}

export const AutocompleteComponent: FC<AutocompleteProps> = ({
  search,
  error,
  selectedOption,
  setSelectedOption,
}) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    Array<PokemonOption>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updatedParams = new URLSearchParams(searchParams);

  const updatePathname = (searchParam: string, value?: string) => {
    if (value) {
      updatedParams.set(searchParam, value);
    } else {
      updatedParams.delete(searchParam);
    }

    router.push(`${pathname}?${updatedParams.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePathname("search", searchPhrase);
    }, 1000);
    updatePathname("name", selectedOption?.label);

    return () => clearTimeout(timer);
  }, [searchPhrase, selectedOption]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchPhrase == "") return;
        setIsLoading(true);
        const response = await fetch(`/api/search?name=${searchPhrase}`);
        const data = await response.json();
        setAutocompleteOptions(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

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
        options={autocompleteOptions}
        onChange={(_, value) => {
          setSelectedOption(value ?? defaultAutocompleteValue);
        }}
        onInputChange={(_, value) => {
          setSearchPhrase(value);
        }}
        filterOptions={(options) => {
          options = autocompleteOptions;
          return options;
        }}
        renderInput={(params) => (
          <Input
            sx={(theme) => ({
              width: "100%",
              border: `1px solid ${theme.palette.grey[400]}`,
              borderRadius: "4px",
              marginBottom: "0.25rem",
              "& .MuiInput-input": {
                padding: "14px 10px !important",
              },
            })}
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
