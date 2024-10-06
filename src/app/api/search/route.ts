import { NextRequest, NextResponse } from "next/server";
import { pokemonOptions } from "@/db/utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pokemonName = searchParams.get("name");
  let searchedPokemons;

  if (pokemonName !== null) {
    const lowerCasedQuery = pokemonName.toLowerCase();
    const newPokemons = pokemonOptions.filter(({ label }: { label: string }) =>
      label.includes(lowerCasedQuery)
    );
    searchedPokemons = newPokemons;
  }

  return NextResponse.json(searchedPokemons);
}
