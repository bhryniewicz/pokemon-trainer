import { getTrainers } from "@/actions/getTrainers";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function TrainersPage() {
  const trainers = await getTrainers();

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
        <Suspense fallback={<h1>loading table...</h1>}>
          <TrainersTable trainers={trainers} />
        </Suspense>
      </Container>
    </Container>
  );
}

const TrainersTable = ({ trainers }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trainer's nane</TableCell>
            <TableCell align="right">Chosen pokemon</TableCell>
            <TableCell align="right">Trainer's age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainers.map((trainer: any) => {
            return (
              <TableRow
                key={trainer.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{trainer.name}</TableCell>
                <TableCell align="right">{trainer.pokemon}</TableCell>
                <TableCell align="right">{trainer.age}</TableCell>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={trainer.image}
                    alt="trainers image"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
