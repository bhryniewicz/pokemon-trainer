"use client";

import { useInfinitePokemonsQuery } from "@/hooks/usePokemonQuery";
import { PokemonBasicInfo, PokemonDataType } from "@/types/pokemon";
import { Box, Grid2, Typography, alpha } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PokemonsListItem } from "./PokemonListItem/PokemonListItem";

interface PokemonsListProps {
  initialPokemons?: Array<PokemonDataType>;
}

export const PokemonsList: FC<PokemonsListProps> = ({ initialPokemons }) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, status, hasNextPage, isError } =
    useInfinitePokemonsQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === "pending") return <p>Loading...</p>;

  if (isError) return <p>Error: no pokemons!!!</p>;

  return (
    <>
      <Grid2 container spacing={4}>
        {data.pages.map((pokemons, i) => (
          <React.Fragment key={i}>
            {pokemons.map((pokemon) => {
              return <PokemonsListItem {...pokemon} key={pokemon.id} />;
            })}
          </React.Fragment>
        ))}
      </Grid2>
      <Typography variant="body2" ref={ref} sx={{ textAlign: "center", pt: 3 }}>
        Loading...
      </Typography>
    </>
  );
};

