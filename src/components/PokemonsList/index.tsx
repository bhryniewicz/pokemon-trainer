"use client";

import { getPokemonsData } from "@/actions/getPokemonsData";
import { TypeBox } from "@/components/PokemonData/TypeBox";
import { Box, Button, Grid2, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const NUMBER_OF_POKEMONS_TO_FETCH = 10;

export const PokemonsList = ({ initialPokemons }) => {
  const [offset, setOffset] = useState<number>(NUMBER_OF_POKEMONS_TO_FETCH);
  const [pokemons, setPokemons] = useState<Array<any>>(initialPokemons);
  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    const apiPokemons = await getPokemonsData(
      NUMBER_OF_POKEMONS_TO_FETCH,
      offset
    );
    setPokemons((prevPokemons) => [...prevPokemons, ...apiPokemons]);
    setOffset((offset) => offset + NUMBER_OF_POKEMONS_TO_FETCH);
  };

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  return (
    <>
      <Grid2 container spacing={4}>
        {pokemons.map((name) => {
          return (
            <Grid2
              size={6}
              key={`${name.id}-${name.name}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 3,
                px: 5,
                border: "1px solid #eeeeee",
                borderRadius: "4px",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  fontSize: "10px",
                }}
              >
                <ListItem sx={{ textTransform: "capitalize" }}>
                  {name.name}
                </ListItem>
                <ListItem>
                  Types:
                  {name.types.map((type) => {
                    return (
                      <TypeBox name={type.type.name} key={type.type.name} />
                    );
                  })}
                </ListItem>
                <Link href={`/pokemons/${name.id}`}>
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </Link>
              </List>

              <Box sx={{ position: "relative", width: "90px", height: "90px" }}>
                <Image fill src={name.image} alt="pokemon image" />
              </Box>
            </Grid2>
          );
        })}
      </Grid2>
      <Typography variant="body2" ref={ref} sx={{ textAlign: "center", pt: 2 }}>
        Loading...
      </Typography>
    </>
  );
};
