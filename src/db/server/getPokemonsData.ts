import { PokemonsListResult } from "@/types/zodValidators/validators";

export const getPokemonsData = async (limit: number, offset: number) => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );

  if (!resp.ok) {
    throw new Error("no pokemons");
  }

  const data = await resp.json();

  const names = Promise.all(
    data.results.map(async (result: any) => {
      const resp = await fetch(result.url);

      if (!resp.ok) {
        throw new Error("Failed to fetch pokemon!");
      }

      const data = await resp.json();
      const parsedData = PokemonsListResult.parse(data);

      return {
        id: parsedData.id,
        name: parsedData.name,
        image: parsedData.sprites.other.dream_world.front_default,
        types: parsedData.types,
      };
    })
  );

  return names;
};
