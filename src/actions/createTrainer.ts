"use server";

import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";
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

  const file = formData.get("file") as File;

  let userImage;

  if (file.name === "undefined") {
    userImage = "basic_user_image.png";
  } else {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadDir, file.name);

    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(filePath, buffer);
    userImage = file.name;
  }

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
        image: `http://localhost:3000/uploads/${userImage}`,
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
