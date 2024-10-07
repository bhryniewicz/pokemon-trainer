"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, InputLabel, Input } from "@mui/material";
import React, { useEffect, useState, ReactNode, FC } from "react";

export type PokemonOption = {
  label: string;
  id: number;
};

interface AutocompleteProps {
  search: string;
  error: ReactNode;
  selectedOption: PokemonOption | null;
  setSelectedOption: (value: PokemonOption | null) => void;
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    params.set("search", searchPhrase || "");
    params.set("name", selectedOption?.label || "");
    router.push(`${pathname}?${params.toString()}`);
  }, [searchPhrase, selectedOption]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fetchData = async () => {
      if (selectedOption) return;
      try {
        const response = await fetch(`/api/search?name=${searchPhrase}`);
        const data = await response.json();
        setAutocompleteOptions(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    if (search) {
      timer = setTimeout(() => {
        fetchData();
      }, 1000);
    }

    return () => clearTimeout(timer);
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
        value={selectedOption}
        inputValue={searchPhrase}
        fullWidth
        options={autocompleteOptions}
        onChange={(_, value) => setSelectedOption(value)}
        onInputChange={(_, value) => {
          setSearchPhrase(value);
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
            disableUnderline
            placeholder={"Choose"}
            ref={params.InputProps.ref}
            inputProps={{ ...params.inputProps }}
          />
        )}
      />
      {error}
      <input type="hidden" name="pokemon" value={selectedOption?.label ?? ""} />
    </>
  );
};

export const AutoComplete = React.memo(AutocompleteComponent);
