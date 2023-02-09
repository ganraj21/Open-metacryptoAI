import React from "react";
import { CryptoState } from "../CryptoContext";
import Alert from "react-bootstrap/Alert";
const Alerts = () => {
  const { alert, setAlert } = CryptoState();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };
  return (
    <div
      className="snackbar"
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </div>
  );
};

export default Alerts;
