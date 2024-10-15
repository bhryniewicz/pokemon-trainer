import { getTrainers } from "@/actions/getTrainers";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default async function TrainersPage() {
  const trainers = await getTrainers();

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
      <Link href="/trainers/new">
        <Button variant="contained" color="primary">
          Add new trainer
        </Button>
      </Link>
    </Box>
  );
}
