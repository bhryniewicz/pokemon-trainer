import { z } from "zod";

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
});

export type FormValues = z.infer<typeof schema>;
