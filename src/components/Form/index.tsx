"use client";

import { createTrainer } from "@/actions/createTrainer";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { useDebounce } from "@/hooks/useDebounce";
import { usePokemonSearchQuery } from "@/hooks/usePokemonQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormLabel,
  Grid2,
  InputLabel,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AutoComplete } from "../Autocomplete";
import { PokemonData } from "../PokemonData";
import { SuccessModal } from "../SuccessModal";
import { FormValues, schema } from "./schema";

export const Form: FC = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

  const { data: filteredOptions, isFetching } = usePokemonSearchQuery(
    debouncedSearchPhrase
  );

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("age", data.age.toString());
    formData.append("pokemonName", data.pokemonName);

    await createTrainer(formData);
  };

  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = methods;

  let pokemonName = watch("pokemonName", "");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <FormLabel htmlFor="name">Trainer's name</FormLabel>
              <TextField
                {...register("name")}
                id="name"
                placeholder="Trainer's name"
                autoComplete="off"
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name.message}
              />
              <FormLabel htmlFor="age">Trainer's agee</FormLabel>
              <TextField
                {...register("age")}
                id="age"
                placeholder="Trainer's name"
                autoComplete="off"
                error={Boolean(errors.age)}
                helperText={errors.age && errors.age.message}
              />
            </Box>
            <AutoComplete
              filteredOptions={filteredOptions}
              setSearchPhrase={setSearchPhrase}
              searchPhrase={searchPhrase}
              isLoading={isFetching}
            />
            <PokemonData pokemonName={pokemonName} />
          </Grid2>
          <Grid2
            size={{ xs: 12, sm: 6 }}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <InputLabel>Trainer's image</InputLabel>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #eee",
                borderRadius: "4px",
                flexGrow: 1,
                minHeight: "300px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                component="label"
                sx={{ height: "30px", mb: 1 }}
              >
                Choose File
                {/* <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  name="file"
                  ref={fileInputRef}
                /> */}
              </Button>
            </Box>
          </Grid2>
        </Grid2>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            mt: 2.5,
          }}
        >
          {/* <ResetButton resetInputs={handleResetInputs} color={"secondary"}>
            Reset
          </ResetButton> */}
          <SubmitButton />
        </Box>
      </form>
      <SuccessModal resetInputs={reset} isModalOpen={isSubmitSuccessful} />
    </FormProvider>
  );
};
