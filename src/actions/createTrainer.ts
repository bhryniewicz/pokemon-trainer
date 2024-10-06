"use server";

import { z, ZodIssue } from "zod";

export type FormStateType = {
  errors: Array<ZodIssue>;
  isModalOpen: boolean;
};

const formDataSchema = z.object({
  age: z
    .number()
    .min(16, { message: "Required range from 16-99" })
    .max(99, { message: "Required range from 16-99" }),
  name: z
    .string()
    .min(2, "Required from 2 to 20 symbols")
    .max(20, "Required from 2 to 20 symbols"),
  pokemon: z.string().min(1, { message: "Choose something" }),
});

export const createTrainer = async (
  prevState: unknown,
  formData: FormData
): Promise<FormStateType> => {
  const validation = formDataSchema.safeParse({
    age: Number(formData.get("age")),
    name: formData.get("name"),
    pokemon: formData.get("pokemon"),
  });

  if (validation.success) {
    return {
      errors: [],
      isModalOpen: true,
    };
  } else {
    return {
      errors: validation.error.issues,
      isModalOpen: false,
    };
  }
};
