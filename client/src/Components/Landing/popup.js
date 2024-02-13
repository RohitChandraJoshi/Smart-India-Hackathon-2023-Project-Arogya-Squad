import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

function Popup() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Test Credentials
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Test Email and Password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          for student -
            <br />
            Email: teststudent@gmail.com
            <br />
            Password: Teststudent67@76
            <br />
            <br />
            for guide -
            <br />
            Email: testguide@gmail.com
            <br />
            Password: Testguide56@65
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Popup;
