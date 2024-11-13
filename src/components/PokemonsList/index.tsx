"use client";

import { getPokemonsData } from "@/db/server/getPokemonsData";
import { PokemonBasicInfo, PokemonDataType } from "@/types/pokemon";
import { Box, Grid2, Typography, alpha } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface PokemonsListProps {
  initialPokemons?: Array<PokemonDataType>;
}

export const PokemonsList: FC<PokemonsListProps> = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, status, hasNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["list"],
      queryFn: getPokemonsData,
      initialPageParam: 0,
      getNextPageParam: (_, poks) => {
        return poks.flat().length;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);


  //prefetch on server 
  //adjsut some patterns for usequery
  //testing???
  //single pokemon paage
  //local storage theme mode
  //refactor table
  //change trainers data

  return status === "pending" ? (
    <p>Loading...</p>
  ) : isError ? (
    <div>Error: NO pokemons!!!</div>
  ) : (
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

const PokemonsListItem: FC<PokemonBasicInfo> = ({ id, name, image }) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
      <Link
        href={`/pokemons/${id}`}
        style={{
          textDecoration: "none",
          color: "#9747FF",
          textAlign: "center",
        }}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: "4px",
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
            transition: "0.3s",

            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.light, 0.15),
            },
          })}
        >
          <Box sx={{ position: "relative", width: "80px", height: "80px" }}>
            <Image fill src={image} alt="pokemon image" />
          </Box>

          <Typography
            variant="body1"
            sx={{ textTransform: "capitalize", mt: 2 }}
          >
            {name}
          </Typography>
        </Box>
      </Link>
    </Grid2>
  );
};
