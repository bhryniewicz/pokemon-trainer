import { ActualDate } from "@/components/ActualDate";
import { Form } from "@/components/Form";
import { Box, Container } from "@mui/material";
import { FC } from "react";
import { PokemonData } from "../PokemonData";

interface FormProps {
  search?: string;
  name?: string;
}

export const FormContainer: FC<FormProps> = async ({
  search = "",
  name = "",
}) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          border: { sx: "none", sm: `1px solid #eeeeee` },
          p: { xs: 2, sm: 4 },
        }}
      >
        <ActualDate />
        <Form search={search}>
          <PokemonData pokemonName={name} key={name} />
        </Form>
      </Box>
    </Container>
  );
};
