"use client";

import { TypeBox } from "@/components/PokemonData/TypeBox";
import { getPokemonData } from "@/db/server/getPokemonData";
import { boxSx } from "@/theme/styles";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";

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
  gap: "1rem",
  p: 2,
  mt: 3,
};

export const PokemonData: FC<PokemonDataProps> = ({ pokemonName }) => {
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: async () => await getPokemonData(pokemonName),
    enabled: pokemonName !== "",
  });

  if (isLoading)
    return (
      <Box sx={{ ...boxStyles }}>
        <Typography variant="body2">Loading pokemon...</Typography>
      </Box>
    );

  return pokemon ? (
    <Box
      sx={{
        ...boxStyles,
      }}
    >
      <Image src={pokemon.image} alt="pokemon image" width={200} height={200} />
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
      <Typography variant="body2">Your pokemon</Typography>
    </Box>
  );
};
