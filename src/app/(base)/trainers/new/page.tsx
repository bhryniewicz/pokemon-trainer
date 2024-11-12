import { FormContainer } from "@/components/FormContainer";
import { Box, Button, Divider } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: { xs: 4, sm: 8 },
          pb: { xs: 4, sm: 0 },
        }}
      >
        <FormContainer search={search} name={name} />
        <Divider variant="middle" orientation="vertical" flexItem />
        <Button
          LinkComponent={Link}
          href="/trainers"
          variant="outlined"
          color="primary"
        >
          Back to trainers' list
        </Button>
      </Box>
    </HydrationBoundary>
  );
}
