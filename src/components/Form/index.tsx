"use client";

import { useState, FC, useEffect, ReactNode } from "react";
import { useFormState } from "react-dom";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Typography, Box } from "@mui/material";
import type { ZodIssue } from "zod";
import { createTrainer, FormStateType } from "@/actions/createTrainer";
import { AutoComplete, PokemonOption } from "@/components/Autocomplete";
import { FormInput } from "@/components/FormInput";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { SuccessModal } from "@/components/SuccessModal";
import { ResetButton } from "@/components/Buttons/ResetButton";

interface FormProps {
  pokemonDataComponent: ReactNode;
  search: string;
}

export const Form: FC<FormProps> = ({ pokemonDataComponent, search }) => {
  const [selectedOption, setSelectedOption] = useState<PokemonOption | null>(
    null
  );
  const [state, formAction] = useFormState<FormStateType, FormData>(
    createTrainer,
    {
      errors: [],
      isModalOpen: false,
    }
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(state.isModalOpen);
  const [inputName, setInputName] = useState<string>("");
  const [inputAge, setInputAge] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const nameErrors = findErrors("name", state.errors);
  const ageErrors = findErrors("age", state.errors);
  const pokemonErrors = findErrors("pokemon", state.errors);

  const handleResetInputs = () => {
    setInputName("");
    setInputAge("");
    setSelectedOption(null);
    params.set("name", "");
    params.set("search", "");

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setIsModalOpen(state.isModalOpen);
  }, [state.isModalOpen]);

  return (
    <form action={formAction}>
      <Box
        sx={{
          display: "flex",
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
      {pokemonDataComponent}
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
      <SuccessModal
        resetInputs={handleResetInputs}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </form>
  );
};

const ErrorMessages = ({ errors }: { errors: Array<string> }) => {
  if (errors.length === 0) return null;

  const text = errors.join(", ");

  return (
    <Typography variant="h6" color="error" sx={{ fontSize: "10px" }}>
      {text}
    </Typography>
  );
};

const findErrors = (fieldName: string, errors: Array<ZodIssue>) => {
  return errors
    .filter((error) => {
      return error.path.includes(fieldName);
    })
    .map((error) => error.message);
};
