import { ModeTypes } from "@/app/layout";
import {
  AppBar,
  Box,
  Container,
  Link as MuiLink,
  Switch,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface NavbarProps {
  setMode: Dispatch<SetStateAction<ModeTypes>>;
}

export const Navbar: FC<NavbarProps> = ({ setMode }) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "10vh",
      }}
    >
      <Container maxWidth="lg">
        <AppBar
          position="static"
          sx={{
            px: "3rem",
            pt: "2rem",
            backgroundColor: "inherit",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "2rem",
              width: "100%",
            }}
          >
            <MuiLink component={Link} href="/">
              Home
            </MuiLink>
            <MuiLink component={Link} href="/pokemons">
              Pokemons
            </MuiLink>
            <MuiLink component={Link} href="/trainers">
              Trainers
            </MuiLink>

            <Switch
              onClick={() =>
                setMode((prev) => (prev === "dark" ? "light" : "dark"))
              }
            />
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};
