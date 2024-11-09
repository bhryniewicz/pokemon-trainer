import { PokemonListSkeleton } from "@/components/SkeletonLoaders/PokemonListSkeleton";
import { Grid2, Typography } from "@mui/material";

export default function Lodaing() {
  return (
    <>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Pokemons List
      </Typography>
      <Grid2 container spacing={4}>
        {Array.from(new Array(10)).map((_, index) => (
          <PokemonListSkeleton key={index} />
        ))}
      </Grid2>
    </>
  );
}
