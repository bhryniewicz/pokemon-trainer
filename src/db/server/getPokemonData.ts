"use server";

import { PokemonDataType } from "@/types/pokemon";
import { PokemonResult } from "@/types/zodValidators/validators";

export const getPokemonData = async (
  pokemonName: string
): Promise<PokemonDataType> => {
  if (pokemonName == "") {
    throw new Error("jd");
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
  )
    .then((resp) => resp.json())
    .catch((e) => console.log(e));

  const parsedData = PokemonResult.parse(response);

  return {
    id: parsedData.id,
    name: parsedData.name,
    image: parsedData.sprites.other.dream_world.front_default!,
    types: parsedData.types,
    base_experience: parsedData.base_experience,
  };
};
