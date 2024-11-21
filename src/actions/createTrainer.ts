"use server";

import { z, ZodIssue } from "zod";

export type FormStateType = {
  errors: Array<ZodIssue>;
  isModalOpen: boolean;
};

//change namings
//refactor structure of files
//create server action again
//changes boxes to Stack
//One button component

export const createTrainer = async (formData: FormData) => {
  console.log(formData.get("image"));
  console.log("koniec na serwerze");
  //   let userImage;

  //   const validation = formDataSchema.safeParse({
  //     age: Number(formData.get("age")),
  //     name: formData.get("name"),
  //     pokemon: formData.get("pokemon"),
  //   });

  //   //   if (validation.success) {
  //   //     const image = formData.get("file") as File;

  //   //     if (image.name === "undefined") {
  //   //       userImage = "basic_user_image.png";
  //   //     } else {
  //   //       const buffer = Buffer.from(await image.arrayBuffer());
  //   //       const uploadDir = path.join(process.cwd(), "public/uploads");
  //   //       const filePath = path.join(uploadDir, image.name);

  //   //       await fs.mkdir(uploadDir, { recursive: true });

  //   //       await fs.writeFile(filePath, buffer);
  //   //       userImage = image.name;
  //   //     }

  //   if (validation.success) {
  //     await fetch("http://localhost:3000/api/trainer", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: crypto.randomUUID(),
  //         name: formData.get("name"),
  //         age: Number(formData.get("age")),
  //         pokemon: formData.get("pokemon"),
  //         image: `http://localhost:3000/uploads/6d3.jpeg`,
  //       }),
  //     });
  //   }

  //   revalidatePath("/trainers");

  //     return {
  //       errors: [],
  //       isModalOpen: true,
  //     };
  //   } else {
  //     console.log(validation.error.issues);

  //     return {
  //       errors: validation.error.issues,
  //       isModalOpen: false,
  //     };
  //   }

  return true;
};
