import { Modal, Typography, Box } from "@mui/material";
import { FC } from "react";
import { ResetButton } from "@/components/Buttons/ResetButton";

interface SuccessModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  resetInputs: () => void;
}

export const SuccessModal: FC<SuccessModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  resetInputs,
}) => {
  const handleButtonAction = () => {
    resetInputs();
    setIsModalOpen(false);
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
      onClose={() => setIsModalOpen(false)}
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
