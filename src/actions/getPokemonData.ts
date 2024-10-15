"use server";

import { z } from "zod";

export const wait = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log());
    }, duration);
  });
};

const PokemonType = z.object({
  type: z.object({
    name: z.string(),
  }),
});

const PokemonResult = z.object({
  id: z.number(),
  base_experience: z.number(),
  name: z.string(),
  types: z.array(PokemonType),
  sprites: z.object({
    front_default: z.string(),
  }),
});

export const getPokemonData = async (pokemonName: string) => {
  if (pokemonName == "") return undefined;

  await wait(2000);

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon with this name!");
  }

  const data = await response.json();
  const parsedData = PokemonResult.parse(data);

  return parsedData;
};
