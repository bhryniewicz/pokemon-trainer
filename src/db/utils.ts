import { PokemonOption } from "@/components/Autocomplete";
import pokemons from "./pokemon.json";

export const pokemonOptions: Array<PokemonOption> = pokemons.data.map(
  (pokemon) => {
    return {
      label: pokemon.name,
      id: pokemon.id,
    };
  }
);
