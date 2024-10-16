import { getPokemonsData } from "@/actions/getPokemonsData";
import { PokemonsList } from "@/components/PokemonsList";
import { Box, Typography } from "@mui/material";

const INITIAL_NUMBER_OF_POKEMONS = 10;

export default async function PokemonsPage() {
  const initialPokemons = await getPokemonsData(INITIAL_NUMBER_OF_POKEMONS, 0);

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Pokemons List
      </Typography>
      <PokemonsList initialPokemons={initialPokemons} />
    </Box>
  );
}
