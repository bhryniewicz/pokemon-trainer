import { Box, Grid2, List, ListItem, Skeleton } from "@mui/material";

export const PokemonListSkeleton = () => {
  return (
    <Grid2
      size={6}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 3,
        px: 5,
        border: "1px solid #eeeeee",
        borderRadius: "4px",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <ListItem>
          <Skeleton variant="text" width={100} />
        </ListItem>
        <ListItem>
          <Skeleton variant="rectangular" width={150} height={20} />
        </ListItem>
      </List>

      <Box sx={{ position: "relative", width: "90px", height: "90px" }}>
        <Skeleton variant="rectangular" width="90px" height="90px" />
      </Box>
    </Grid2>
  );
};
