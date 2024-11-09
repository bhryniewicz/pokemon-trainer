import { z } from "zod";

const PokemonImage = z.object({
  other: z.object({
    dream_world: z.object({
      front_default: z.string().nullable(),
    }),
  }),
});

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
  sprites: PokemonImage,
});

const PokemonsListResult = z.object({
  id: z.number(),
  name: z.string(),
  sprites: PokemonImage,
  types: z.array(PokemonType),
});

export { PokemonResult, PokemonsListResult };
