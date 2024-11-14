import { PokemonOption } from "@/types/pokemon";

export const getSearchedPokemons = async (
  searchPhrase?: string
): Promise<Array<PokemonOption>> => {
  const resp = await fetch(`/api/search?name=${searchPhrase}`);

  const fusedOptions: Array<PokemonOption> = await resp.json();

  return fusedOptions;
};
