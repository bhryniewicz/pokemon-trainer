import { ResetButton } from "@/components/Buttons/ResetButton";
import { Box, Modal, Typography } from "@mui/material";
import { FC } from "react";

interface SuccessModalProps {
  isModalOpen: boolean;
  resetInputs: () => void;
}

export const SuccessModal: FC<SuccessModalProps> = ({
  isModalOpen,
  resetInputs,
}) => {
  const handleButtonAction = () => {
    resetInputs();
  };

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "2px",
      }}
      disableAutoFocus
      open={isModalOpen}
      onClose={handleButtonAction}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          width: "380px",
          height: "176px",
          backgroundColor: "#FFFFFF",
          color: theme.palette.grey[100],
        })}
      >
        <Typography id="modal-modal-description" sx={{ fontSize: "40px" }}>
          Success
        </Typography>
        <ResetButton resetInputs={handleButtonAction} color="primary">
          Reset form
        </ResetButton>
      </Box>
    </Modal>
  );
};
