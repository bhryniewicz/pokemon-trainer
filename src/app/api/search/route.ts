import { pokemonOptions } from "@/db/utils";
import Fuse from "fuse.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pokemonName = request.nextUrl.searchParams.get("name");
  let searchedPokemons;

  if (!pokemonName) {
    return NextResponse.json(
      {
        message: "`name` param is required",
      },
      {
        status: 400,
      }
    );
  }

  const lowerCasedQuery = pokemonName.toLowerCase();
  const fuse = new Fuse(pokemonOptions, {
    keys: ["label"],
  });

  const results = fuse.search(lowerCasedQuery).map((res) => res.item);
  searchedPokemons = results;

  return NextResponse.json(searchedPokemons);
}
