import { getPokemonData } from "../db/server/pokemons/getPokemonData";

global.fetch = jest.fn();

describe("getPokemonData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct data for Pikachu", async () => {
    const mockPikachuResponse = {
      id: 25,
      base_experience: 112,
      name: "pikachu",
      types: [{ type: { name: "electric" } }],
      sprites: { front_default: "https://example.com/sprite.png" },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPikachuResponse,
    });

    const result = await getPokemonData("pikachu");

    if (result == null) return;

    expect(result).toBeDefined(); 
    expect(result.name).toBe("pikachu");
    expect(result.id).toBe(25); 
    expect(result.base_experience).toBe(112); 
    expect(result.types).toHaveLength(1); 
    expect(result.types[0].type.name).toBe("electric"); 
    expect(result.sprites.front_default).toMatch(/^https?:\/\/.+\.png$/); 
  });

  it("should throw an error when fetching non-existent Pokémon", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "Not Found" }),
    });

    await expect(getPokemonData("invalidpokemonname")).rejects.toThrow(
      "Failed to fetch pokemon with this name!"
    );
  });

  it("should return undefined when an empty name is passed", async () => {
    const result = await getPokemonData("");
    expect(result).toBeUndefined(); 
  });
});
