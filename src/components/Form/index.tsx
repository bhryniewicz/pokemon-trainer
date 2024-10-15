"use client";

import { createTrainer, FormStateType } from "@/actions/createTrainer";
import { AutoComplete } from "@/components/Autocomplete";
import { ResetButton } from "@/components/Buttons/ResetButton";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { ErrorMessages, findErrors } from "@/components/Errors/ErrorMessages";
import { FormInput } from "@/components/FormInput";
import { SuccessModal } from "@/components/SuccessModal";
import { PokemonOption } from "@/types/pokemon";
import { Box, Button, Grid2, InputLabel } from "@mui/material";
import { ChangeEventHandler, FC, ReactNode, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { defaultAutocompleteValue } from "./values";

interface FormProps {
  search: string;
  children: ReactNode;
}

export const Form: FC<FormProps> = ({ search, children }) => {
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
  const [image, setImage] = useState<File>();

  const nameErrors = findErrors("name", state.errors);
  const ageErrors = findErrors("age", state.errors);
  const pokemonErrors = findErrors("pokemon", state.errors);

  const handleResetInputs = () => {
    setInputName("");
    setInputAge("");
    setSelectedOption(defaultAutocompleteValue);
    state.isModalOpen = false;
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files as FileList;

    console.log(file[0]);
  };

  useEffect(() => {
    setIsModalOpen(state.isModalOpen);
  }, [state.isModalOpen]);

  return (
    <>
      <form action={formAction}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <FormInput
                label="Trainer's name"
                placeholder="Trainer's name"
                name="name"
                error={<ErrorMessages errors={nameErrors} />}
                value={inputName}
                setValue={setInputName}
              />
              <FormInput
                label="Trainer's age"
                placeholder="Trainer's age"
                name="age"
                error={<ErrorMessages errors={ageErrors} />}
                value={inputAge}
                setValue={setInputAge}
              />
            </Box>
            <AutoComplete
              search={search}
              error={<ErrorMessages errors={pokemonErrors} />}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            {children}
          </Grid2>
          <Grid2 size={6} sx={{ display: "flex", flexDirection: "column" }}>
            <InputLabel>Trainer's image</InputLabel>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #eee",
                borderRadius: "4px",
                flexGrow: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                component="label"
                sx={{ height: "30px" }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  name="file"
                />
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
