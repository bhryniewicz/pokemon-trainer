"use client";

import { ThemeTypes } from "@/app/layout";
import { saveTheme } from "@/db/server/saveTheme";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Link as MuiLink,
  Stack,
  Switch,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface NavbarProps {
  theme: ThemeTypes;
}

export const Navbar: FC<NavbarProps> = ({ theme }) => {
  const [isDraweOpen, setIsDrawerOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const newTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const commonMenu = (
    <>
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
        checked={theme === "dark"}
        onClick={async () => {
          await saveTheme(newTheme);
        }}
      />
    </>
  );

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
              flexDirection: "row",
              justifyContent: "center",
              gap: "2rem",
              width: "100%",
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              },
            }}
          >
            {commonMenu}
          </Toolbar>
          <IconButton
            color="primary"
            size="large"
            onClick={() => setIsDrawerOpen(true)}
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={isDraweOpen}
            onClose={() => setIsDrawerOpen(false)}
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "none",
                xl: "none",
              },
            }}
            PaperProps={{
              sx: {
                width: 250,
              },
            }}
          >
            <Stack
              direction="column"
              gap={1}
              justifyContent={"center"}
              alignItems={"center"}
              flexGrow={1}
            >
              {commonMenu}
            </Stack>
          </Drawer>
        </AppBar>
      </Container>
    </Box>
  );
};
