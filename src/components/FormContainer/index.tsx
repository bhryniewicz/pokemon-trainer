import { FC } from "react";
import { Box, Container } from "@mui/material";
import { ActualDate } from "@/components/ActualDate";
import { PokemonData } from "@/components/PokemonData";
import { Form } from "@/components/Form";

interface FormProps {
  search?: string;
  name?: string;
}

export const FormContainer: FC<FormProps> = async ({
  search = "",
  name = "",
}) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ border: `1px solid #eeeeee`, p: 4 }}>
        <ActualDate />
        <Form
          search={search}
          pokemonDataComponent={<PokemonData pokemonName={name} key={search} />}
        />
      </Box>
    </Container>
  );
};
