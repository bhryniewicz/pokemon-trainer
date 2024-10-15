import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ gap: "1rem" }}>
          <Link href="/">Home</Link>
          <Link href="/pokemons">Pokemons</Link>
          <Link href="/trainers">Trainers</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
