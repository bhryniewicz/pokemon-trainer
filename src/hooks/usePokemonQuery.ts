import { getPokemonData } from "@/db/server/pokemons/getPokemonData";
import { getPokemonsData } from "@/db/server/pokemons/getPokemonsData";
import { getSearchedPokemons } from "@/db/server/pokemons/getSearchedPokemons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const usePokemonSearchQuery = (debouncedSearchPhrase: string) =>
  useQuery({
    queryKey: ["searched-pokemon", debouncedSearchPhrase],
    queryFn: async () => await getSearchedPokemons(debouncedSearchPhrase),
    initialData: [],
    staleTime: 0,
    enabled: debouncedSearchPhrase !== "",
  });

export const useInfinitePokemonsQuery = () =>
  useInfiniteQuery({
    queryKey: ["list"],
    queryFn: getPokemonsData,
    initialPageParam: 0,
    getNextPageParam: (_, poks) => {
      return poks.flat().length;
    },
  });

export const usePokemonQuery = (pokemonName: string) =>
  useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: async () => await getPokemonData(pokemonName),
    enabled: pokemonName !== "",
  });
