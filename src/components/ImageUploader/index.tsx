import { Box, Button, FormLabel } from "@mui/material";

export const ImageUploader = () => {
  return (
    <>
      <FormLabel>Trainer's image</FormLabel>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #eee",
          borderRadius: "4px",
          flexGrow: 1,
          minHeight: "300px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component="label"
          sx={{ height: "30px", mb: 1 }}
        >
          Choose File
          {/* <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  name="file"
                  ref={fileInputRef}
                /> */}
        </Button>
      </Box>
    </>
  );
};
