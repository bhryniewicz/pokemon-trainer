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

export const wait = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log());
    }, duration);
  });
};
