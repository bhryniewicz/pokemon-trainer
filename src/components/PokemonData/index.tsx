import { Box, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import { getPokemonData } from "@/actions/getPokemonData";
import { TypeBox } from "@/components/PokemonData/TypeBox";
import { FC } from "react";

interface PokemonDataProps {
  pokemonName: string;
}

export const PokemonData: FC<PokemonDataProps> = async ({ pokemonName }) => {
  const pokemon = await getPokemonData(pokemonName);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid #eeeeee`,
        height: "300px",
        mt: 3,
      }}
    >
      {pokemon ? (
        <>
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
        </>
      ) : (
        <Typography color="secondary.dark" variant="body2">
          Your pokemon
        </Typography>
      )}
    </Box>
  );
};
