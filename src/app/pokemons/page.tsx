import { getPokemonsData } from "@/actions/getPokemonsData";
import { TypeBox } from "@/components/PokemonData/TypeBox";
import { PokemonListSkeleton } from "@/components/SkeletonLoaders/PokemonListSkeleton";
import { Box, Button, Grid2, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function PokemonsPage() {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Pokemons List
      </Typography>
      <Suspense
        fallback={
          <Grid2 container spacing={4}>
            {Array.from(new Array(10)).map((_, index) => (
              <PokemonListSkeleton key={index} />
            ))}
          </Grid2>
        }
      >
        <PokemonsList />
      </Suspense>
    </Box>
  );
}

const PokemonsList = async () => {
  const pokemons = await getPokemonsData();

  return (
    <Grid2 container spacing={4}>
      {pokemons.map((name) => {
        return (
          <Grid2
            size={6}
            key={name.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 3,
              px: 5,
              border: "1px solid #eeeeee",
              borderRadius: "4px",
            }}
          >
            <List
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <ListItem sx={{ textTransform: "capitalize" }}>
                {name.name}
              </ListItem>
              <ListItem>
                Types:
                {name.types.map((type) => {
                  return <TypeBox name={type.type.name} key={type.type.name} />;
                })}
              </ListItem>
              <Link href={`/pokemons/${name.id}`}>
                <Button variant="contained" color="primary">
                  View
                </Button>
              </Link>
            </List>

            <Box sx={{ position: "relative", width: "90px", height: "90px" }}>
              <Image fill src={name.image} alt="pokemon image" />
            </Box>
          </Grid2>
        );
      })}
    </Grid2>
  );
};
