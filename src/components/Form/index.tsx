"use client";

import { createTrainer } from "@/actions/createTrainer";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { useDebounce } from "@/hooks/useDebounce";
import { usePokemonSearchQuery } from "@/hooks/usePokemonQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormLabel, Grid2, Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AutoComplete } from "../Autocomplete";
import { ResetButton } from "../Buttons/ResetButton";
import { PokemonData } from "../PokemonData";
import { SuccessModal } from "../SuccessModal";
import { FormValues, schema } from "./schema";
import { ImageUploader } from "../ImageUploader";

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
    defaultValues: {
      pokemonName: "",
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = methods;

  let pokemonName = watch("pokemonName");

  return (
    <FormProvider {...methods}>
      <Grid2
        container
        spacing={3}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
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

            <Grid2 size={6}>
              <FormLabel htmlFor="name">Trainer's name</FormLabel>
              <TextField
                {...register("name")}
                id="name"
                placeholder="Trainer's name"
                autoComplete="off"
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name.message}
              />
            </Grid2>

            <Grid2 size={6}>
              <FormLabel htmlFor="age">Trainer's agee</FormLabel>
              <TextField
                {...register("age")}
                id="age"
                placeholder="Trainer's name"
                autoComplete="off"
                fullWidth
                error={Boolean(errors.age)}
                helperText={errors.age && errors.age.message}
              />
            </Grid2>

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
          <ImageUploader />
        </Grid2>

        <Grid2 size={12}>
          <Stack direction="row" justifyContent="flex-end" spacing={1.2}>
            <ResetButton resetInputs={() => reset()} color={"secondary"}>
              Reset
            </ResetButton>
            <SubmitButton />
          </Stack>
        </Grid2>

      </Grid2>

      <SuccessModal
        resetInputs={() => reset()}
        isModalOpen={isSubmitSuccessful}
      />
    </FormProvider>
  );
};
