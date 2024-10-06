import { Box } from "@mui/material";
import { FormContainer } from "@/components/FormContainer";

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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FormContainer search={search} name={name} />
    </Box>
  );
}
