import { getTrainers } from "@/actions/getTrainers";
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{trainer.name}</TableCell>
                <TableCell align="right">{trainer.pokemon}</TableCell>
                <TableCell align="right">{trainer.age}</TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                    }}
                  >
                    <Image
                      src={trainer.image}
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
    <h1>No trainers at this moment!</h1>
  );
};
