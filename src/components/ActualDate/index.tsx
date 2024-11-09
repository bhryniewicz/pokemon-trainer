import { getActualDate } from "@/db/server/getActualDate";
import { Typography } from "@mui/material";
import { FC } from "react";

export const ActualDate: FC = async () => {
  const { dayOfWeek, dateTime } = await getActualDate();

  return (
    <Typography
      variant="body2"
      sx={{ mb: 3 }}
      color="secondary.light"
      align="right"
    >
      {dayOfWeek}, {dateTime}
    </Typography>
  );
};
