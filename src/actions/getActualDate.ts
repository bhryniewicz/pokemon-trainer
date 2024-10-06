"use server";

import { intlFormat } from "date-fns";
import { z } from "zod";

const DateResult = z.object({
  dayOfWeek: z.string(),
  dateTime: z.string(),
});

export const getActualDate = async () => {
  const response = await fetch(
    "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch actual date");
  }

  const data = await response.json();

  const parsedData = DateResult.parse(data);
  const formattedDateTime = intlFormat(parsedData.dateTime);

  return { dayOfWeek: parsedData.dayOfWeek, dateTime: formattedDateTime };
};
