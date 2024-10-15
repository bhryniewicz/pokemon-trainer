import { FormContainer } from "@/components/FormContainer";
import { Box, Button, Divider } from "@mui/material";
import Link from "next/link";

interface TrainersPageProps {
  searchParams: {
    search?: string;
    name?: string;
  };
}

export default async function NewTrainerPage({
  searchParams: { search = "", name = "" },
}: TrainersPageProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 8,
      }}
    >
      <FormContainer search={search} name={name} />
      <Divider variant="middle" orientation="vertical" flexItem />
      <Link href="/trainers">
        <Button
          variant="outlined"
          color="primary"
          sx={{ width: "fit-content" }}
        >
          Back to trainers' list
        </Button>
      </Link>
    </Box>
  );
}
