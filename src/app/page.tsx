import { getTrainers } from "@/actions/getTrainers";
import { FormContainer } from "@/components/FormContainer";
import { Box, Typography } from "@mui/material";

interface HomePageProps {
  searchParams: {
    search?: string;
    name?: string;
  };
}

export default async function Home({
  searchParams: { search = "", name = "" },
}: HomePageProps) {
  const trainers = await getTrainers();

  console.log(trainers);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
      }}
    >
      {trainers.map((trainer: any) => {
        return (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Typography variant="body2">{trainer.name}</Typography>
            <Typography variant="body2">{trainer.pokemon}</Typography>
            <Typography variant="body2">{trainer.age}</Typography>
          </Box>
        );
      })}
      <FormContainer search={search} name={name} />
    </Box>
  );
}
