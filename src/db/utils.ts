import { PokemonOption } from "@/types/pokemon";
import pokemons from "./pokemon.json";

export const pokemonOptions: Array<PokemonOption> = pokemons.data.map(
  (pokemon) => {
    return {
      label: pokemon.name,
      id: pokemon.id,
    };
  }
);
