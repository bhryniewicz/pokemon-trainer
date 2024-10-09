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
        minHeight: "100vh",
        pt: 2,
      }}
    >
      <FormContainer search={search} name={name} />
    </Box>
  );
}
