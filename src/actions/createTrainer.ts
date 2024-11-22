"use server";

import { schema } from "@/components/Form/schema";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path"; // For handling file paths
import { ZodIssue } from "zod";

export type FormStateType = {
  errors: Array<ZodIssue>;
};

//refactor structure of files
//create server action again -- handle if no image
//changes boxes to Stack
//One button component

export const createTrainer = async (formData: FormData) => {
  let imageUrl = null;

  const validation = schema.safeParse({
    age: formData.get("age"),
    name: formData.get("name"),
    pokemonName: formData.get("pokemonName"),
    image: formData.get("image"),
  });

  if (validation.success) {
    const image = formData.get("image") as File;

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, image.name);

      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(filePath, buffer);

      imageUrl = `http://localhost:3000/uploads/${image.name}`;
    }

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
        pokemon: formData.get("pokemonName"),
        image: imageUrl,
      }),
    });

    console.log("koniec dodawania obrazu");

    revalidatePath("/trainers");

    return {
      errors: [],
    };
  }

  return {
    errors: validation.error.issues,
  };
};
