"use client";

import { getPokemonData } from "@/actions/getPokemonData";
import { TypeBox } from "@/components/PokemonData/TypeBox";
import { boxSx } from "@/theme/styles";
import { PokemonDataType } from "@/types/pokemon";
import { Box, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface PokemonDataProps {
  pokemonName: string;
}

export const boxStyles = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid #eeeeee`,
  minHeight: "300px",
  p: 2,
  mt: 3,
};

export const PokemonData: FC<PokemonDataProps> = ({ pokemonName }) => {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<PokemonDataType>(undefined);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (pokemonName == "") return;
      try {
        setIsDataLoading(true);
        const data = await getPokemonData(pokemonName);
        setPokemon(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (isDataLoading)
    return (
      <Box sx={{ ...boxStyles }}>
        <Typography variant="body2" color="secondary.light">
          Loading pokemon...
        </Typography>
      </Box>
    );

  return pokemon ? (
    <Box
      sx={{
        ...boxStyles,
      }}
    >
      <Image
        src={pokemon.sprites.front_default}
        alt="pokemon image"
        width={200}
        height={200}
      />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          ml: "1rem",
        }}
      >
        <ListItem>Name: {pokemon.name}</ListItem>
        <ListItem>
          Type:{" "}
          {pokemon.types.map(({ type }: { type: { name: string } }) => {
            return <TypeBox key={type.name} name={type.name} />;
          })}
        </ListItem>
        <ListItem>Base experience: {pokemon.base_experience}</ListItem>
        <ListItem>Id: {pokemon.id}</ListItem>
      </List>
    </Box>
  ) : (
    <Box sx={{ ...boxSx }}>
      <Typography variant="body2" color="secondary.light">
        Your pokemon
      </Typography>
    </Box>
  );
};
