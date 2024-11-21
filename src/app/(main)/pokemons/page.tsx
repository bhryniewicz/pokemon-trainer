import { PokemonsList } from "@/components/PokemonsList/PokemonList";
import { Box, Typography } from "@mui/material";

export default async function PokemonsPage() {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Pokemons List
      </Typography>
      <PokemonsList />
    </Box>
  );
}
