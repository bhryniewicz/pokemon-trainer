import { wait } from "@/db/utils";

export const getTrainers = async () => {
  const resp = await fetch("http://localhost:3000/api/trainer");

  await wait(2000);

  if (!resp.ok) {
    throw new Error("Failed to fetch trainers");
  }

  const data = resp.json();

  return data;
};
