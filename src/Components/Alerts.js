import React from "react";
import { CryptoState } from "../CryptoContext";
import Toast from "react-bootstrap/Toast";

const Alerts = () => {
  const { alert, setAlert } = CryptoState();

  return (
    <Toast
      onClose={() => setAlert(false)}
      show={alert.open}
      delay={3000}
      autohide
      style={{ position: "absolute" }}
    >
      <Toast.Body>{alert.message}</Toast.Body>
    </Toast>
  );
};

export default Alerts;

/* <Alert
        open={alert.open}
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </Alert> */
