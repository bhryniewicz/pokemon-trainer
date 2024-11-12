"use client";

import { createTrainer, FormStateType } from "@/actions/createTrainer";
import { AutoComplete } from "@/components/Autocomplete";
import { ResetButton } from "@/components/Buttons/ResetButton";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { ErrorMessages, findErrors } from "@/components/Errors/ErrorMessages";
import { FormInput } from "@/components/FormInput";
import { SuccessModal } from "@/components/SuccessModal";
import { PokemonOption } from "@/types/pokemon";
import { Box, Button, Grid2, InputLabel, Typography } from "@mui/material";
import { ChangeEventHandler, FC, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { PokemonData } from "../PokemonData";
import { defaultAutocompleteValue } from "./values";

export const Form: FC = () => {
  const [state, formAction] = useFormState<FormStateType, FormData>(
    createTrainer,
    {
      errors: [],
      isModalOpen: false,
    }
  );
  const [selectedOption, setSelectedOption] = useState<PokemonOption>(
    defaultAutocompleteValue
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(state.isModalOpen);
  const [inputName, setInputName] = useState<string>("");
  const [inputAge, setInputAge] = useState<string>("");
  const [imageName, setImageName] = useState<string>("No file choosen");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResetInputs = () => {
    setInputName("");
    setInputAge("");
    setSelectedOption(defaultAutocompleteValue);
    state.isModalOpen = false;
    fileInputRef.current!.value = "";
    setImageName("No file choosen");
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files as FileList;

    if (file) {
      setImageName(file[0]?.name);
    } else {
      setImageName("No file chosen");
    }
  };

  useEffect(() => {
    setIsModalOpen(state.isModalOpen);
  }, [state.isModalOpen]);

  return (
    <>
      <form action={formAction}>
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
              <FormInput
                label="Trainer's name"
                placeholder="Trainer's name"
                name="name"
                error={
                  <ErrorMessages errors={findErrors("name", state.errors)} />
                }
                value={inputName}
                setValue={setInputName}
              />
              <FormInput
                label="Trainer's age"
                placeholder="Trainer's age"
                name="age"
                error={
                  <ErrorMessages errors={findErrors("age", state.errors)} />
                }
                value={inputAge}
                setValue={setInputAge}
              />
            </Box>
            <AutoComplete
              error={
                <ErrorMessages errors={findErrors("pokemon", state.errors)} />
              }
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <PokemonData pokemonName={selectedOption.label} />
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
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  name="file"
                  ref={fileInputRef}
                />
              </Button>
              <Typography variant="body1">{imageName}</Typography>
              <ErrorMessages errors={findErrors("image", state.errors)} />
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
          <ResetButton resetInputs={handleResetInputs} color={"secondary"}>
            Reset
          </ResetButton>
          <SubmitButton />
        </Box>
      </form>
      <SuccessModal
        resetInputs={handleResetInputs}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};
