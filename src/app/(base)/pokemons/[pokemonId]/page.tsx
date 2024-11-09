import { notFound } from "next/navigation";

export default async function PokemonPage({
  params: { pokemonId },
}: {
  params: { pokemonId: string };
}) {
  if (Number(pokemonId) > 15) return notFound();

  return <h1>jd - {pokemonId}</h1>;
}
