import { PokemonBasicInfo } from "@/types/pokemon";
import { Box, Grid2, Typography, alpha } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const PokemonsListItem: FC<PokemonBasicInfo> = ({ id, name, image }) => {
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
