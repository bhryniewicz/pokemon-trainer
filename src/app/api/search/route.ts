import { wait } from "@/actions/getPokemonData";
import { pokemonOptions } from "@/db/utils";
import Fuse from "fuse.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pokemonName = searchParams.get("name");

  if (pokemonName !== null && pokemonName !== "") {
    let searchedPokemons;

    const lowerCasedQuery = pokemonName.toLowerCase();
    await wait(2000);

    const fuse = new Fuse(pokemonOptions, {
      keys: ["label"],
    });

    const results = fuse.search(lowerCasedQuery).map((res) => res.item);
    searchedPokemons = results;

    return NextResponse.json(searchedPokemons);
  }
}


