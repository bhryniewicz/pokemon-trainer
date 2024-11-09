import { Box, Container } from "@mui/material";

export default function PokemonsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <Box sx={{ m: 4, p: 4, border: "1px solid #eee", borderRadius: "4px" }}>
        {children}
      </Box>
    </Container>
  );
}
