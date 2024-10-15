import { Box } from "@mui/material";

interface HomePageProps {
  searchParams: {
    search?: string;
    name?: string;
  };
}

export default async function Home({
  searchParams: { search = "", name = "" },
}: HomePageProps) {
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
