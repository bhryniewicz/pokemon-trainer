import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg"];

export const schema = z.object({
  name: z.string().refine((val) => val.length >= 2 && val.length <= 20, {
    message: "Required from 2 to 20 symbols",
  }),
  age: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 16 && val <= 99, {
      message: "Required range from 16-99",
    }),
  pokemonName: z.string().refine((val) => val !== "", {
    message: "Choose something",
  }),
  image: z.any().nullable(),
  // .refine(
  //   (file) => {
  //     return file || file?.size <= MAX_UPLOAD_SIZE;
  //   },
  //   { message: "File size must be less than 3MB" }
  // )
  // .refine(
  //   (file) => {
  //     return ACCEPTED_FILE_TYPES.includes(file.type);
  //   },
  //   { message: "File must be a PNG" }
  // ),
});

export type FormValues = z.infer<typeof schema>;
