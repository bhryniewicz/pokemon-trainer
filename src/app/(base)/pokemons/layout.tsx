import { Box, Container } from "@mui/material";

export default function PokemonsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 4,
          p: { xs: 1, sm: 2, md: 4 },
          border: { xs: "none", sm: "1px solid #eee" },
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
