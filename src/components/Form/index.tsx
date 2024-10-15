"use client";

import { createTrainer, FormStateType } from "@/actions/createTrainer";
import { AutoComplete } from "@/components/Autocomplete";
import { ResetButton } from "@/components/Buttons/ResetButton";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { ErrorMessages, findErrors } from "@/components/Errors/ErrorMessages";
import { FormInput } from "@/components/FormInput";
import { SuccessModal } from "@/components/SuccessModal";
import { PokemonOption } from "@/types/pokemon";
import { Box } from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";
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

  const nameErrors = findErrors("name", state.errors);
  const ageErrors = findErrors("age", state.errors);
  const pokemonErrors = findErrors("pokemon", state.errors);

  const handleResetInputs = () => {
    setInputName("");
    setInputAge("");
    setSelectedOption(defaultAutocompleteValue);
    state.isModalOpen = false;
  };

  useEffect(() => {
    setIsModalOpen(state.isModalOpen);
  }, [state.isModalOpen]);

  return (
    <>
      <form action={formAction}>
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
