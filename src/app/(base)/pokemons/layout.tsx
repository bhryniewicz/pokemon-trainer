import { Box, Container } from "@mui/material";

export default function PokemonsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ m: 4, p: 4, border: "1px solid #eee" }}>{children}</Box>
    </Container>
  );
}
