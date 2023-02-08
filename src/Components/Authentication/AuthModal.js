import React, { useState } from "react";
import { Fade, AppBar, Tabs, Tab, Box, Button, Modal } from "@mui/material";
import { styled } from "@mui/system";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";
// import styled from "styled-components";

const ModalStyles = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transperent",
  backdropFilter: "blur(11px)",
}));
const Authbutton = styled(Button)(({ theme }) => ({
  width: "85px",
  height: "40px",
  marginLeft: "15px",
  backgroundColor: "#EEBC1D",
  "&:hover": {
    backgroundColor: "#fff",
  },
}));
const Papers = styled("div")(({ theme }) => ({
  width: 400,
  color: "white",
  borderRadius: 10,
  padding: "25px 20px",
  background: "#2a2c2ed4",
  border: "1px solid #3e343499",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: "15px 20px",
  },
}));
const GoogleBoxs = styled(Box)(({ theme }) => ({
  padding: 24,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 20,
  fontSize: 18,
}));
const AppBarStyle = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "white",
}));
export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { setAlert } = CryptoState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
      }).catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });

      handleClose();
    });
  };
  return (
    <div>
      <Authbutton variant="contained" onClick={handleOpen}>
        Login
      </Authbutton>
      <ModalStyles
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <Papers>
            <AppBarStyle position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                sx={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBarStyle>
            {value === 0 && <Login handleclose={handleClose} />}
            {value === 1 && <Signup handleclose={handleClose} />}
            <GoogleBoxs>
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </GoogleBoxs>
          </Papers>
        </Fade>
      </ModalStyles>
    </div>
  );
}
