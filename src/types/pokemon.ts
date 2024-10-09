type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonImage = {
  front_default: string;
};

export type PokemonDataType =
  | {
      id: number;
      base_experience: number;
      name: string;
      types: Array<PokemonType>;
      sprites: PokemonImage;
    }
  | undefined;

export type PokemonOption = {
  label: string;
  id: number;
};
