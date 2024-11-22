import PokemonTrainer from "@/assets/basicPokemonTrainerImage.png";
import { getTrainers } from "@/db/server/trainers/getTrainers";
import { boxSx } from "@/styles/styles";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function TrainersPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pt: 2,
      }}
      maxWidth="lg"
    >
      <Link href="/trainers/new" style={{ alignSelf: "flex-end" }}>
        <Button variant="contained" color="primary">
          Add new trainer
        </Button>
      </Link>
      <Container
        maxWidth="lg"
        sx={{ border: "1px solid #eeeeee", borderRadius: "4px", py: 2, mt: 2 }}
      >
        <Suspense
          fallback={
            <Box sx={{ ...boxSx, border: "none" }}>
              <Typography variant="body2" color="secondary.light">
                Loading trainers...
              </Typography>
            </Box>
          }
        >
          <TrainersTable />
        </Suspense>
      </Container>
    </Container>
  );
}

const TrainersTable = async () => {
  const trainers = await getTrainers();

  return trainers.length > 0 ? (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trainer's nane</TableCell>
            <TableCell align="right">Chosen pokemon</TableCell>
            <TableCell align="right">Trainer's age</TableCell>
            <TableCell align="right">Trainer's image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainers.map((trainer: any) => {
            return (
              <TableRow
                key={trainer.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                <TableCell sx={{ fontSize: "14px" }}>{trainer.name}</TableCell>
                <TableCell sx={{ fontSize: "14px" }} align="right">
                  {trainer.pokemon}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }} align="right">
                  {trainer.age}
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "14px",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                    }}
                  >
                    <Image
                      src={trainer.image ?? PokemonTrainer}
                      alt="jd"
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "inherit",
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Box sx={{ ...boxSx, border: "none" }}>
      <Typography variant="body2" color="secondary.light">
        You don't have any trainers yet!
      </Typography>
    </Box>
  );
};
