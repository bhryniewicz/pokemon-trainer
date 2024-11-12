import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokemon trainer app",
  description: "App for creating custom pokemon trainer",
  keywords: ["pokemons", "trainer", "new trainer"],
  authors: [{ name: "Bartosz Hryneiwicz" }],
  openGraph: {
    title: "Pokemon trainer app",
    description: "App for creating custom pokemon trainer",
    siteName: "Pokemon trainer app",
    locale: "en_US",
    type: "website",
  },
};

export default async function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
      }}
    ></Box>
  );
}
