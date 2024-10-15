import { wait } from "./getPokemonData";

export const getPokemonsData = async () => {
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");

  await wait(2000);

  if (!resp.ok) {
    throw new Error("no pokemons");
  }

  const data = await resp.json();

  const names = Promise.all(
    data.results.map(async (result: any) => {
      const resp = await fetch(result.url);

      const data = await resp.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        types: data.types,
      };
    })
  );

  return names;
};
