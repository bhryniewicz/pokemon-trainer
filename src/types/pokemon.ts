type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonDataType = {
  id: number;
  base_experience: number;
  name: string;
  types: Array<PokemonType>;
  image: string;
};

export type PokemonOption = {
  label: string;
  id: number;
};

export type PokemonBasicInfo = Pick<
  NonNullable<PokemonDataType>,
  "id" | "name" | "image"
>;
