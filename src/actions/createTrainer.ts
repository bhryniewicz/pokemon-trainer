"use server";

import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import { z, ZodIssue } from "zod";

export type FormStateType = {
  errors: Array<ZodIssue>;
  isModalOpen: boolean;
};

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageSchema = z
  .any()
  .optional()
  .refine((file) => {
    return file.size <= MAX_FILE_SIZE;
  }, `Max image size is 5MB.`)
  .refine((file) => {
    return ACCEPTED_IMAGE_MIME_TYPES.includes(file.type);
  }, "Only .jpg, .jpeg, .png, and .webp formats are supported.");

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
  image: imageSchema,
});

export const createTrainer = async (
  prevState: unknown,
  formData: FormData
): Promise<FormStateType> => {
  let userImage;

  const validation = formDataSchema.safeParse({
    age: Number(formData.get("age")),
    name: formData.get("name"),
    pokemon: formData.get("pokemon"),
    image: formData.get("file"),
  });

  if (validation.success) {
    const image = formData.get("file") as File;

    if (image.name === "undefined") {
      userImage = "basic_user_image.png";
    } else {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, image.name);

      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(filePath, buffer);
      userImage = image.name;
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
    console.log(validation.error.issues);

    return {
      errors: validation.error.issues,
      isModalOpen: false,
    };
  }
};
