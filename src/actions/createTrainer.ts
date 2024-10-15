"use server";

import { revalidatePath } from "next/cache";
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
    await fetch("http://localhost:3000/api/trainer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name: formData.get("name"),
        age: Number(formData.get("age")),
        pokemon: formData.get("pokemon"),
      }),
    });

    revalidatePath("/trainers");

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
