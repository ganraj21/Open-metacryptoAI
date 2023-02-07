import React from "react";
import { makeStyles } from "tss-react/mui";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled, alpha } from "@mui/material/styles";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

const m_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const paper_s = {
  width: 400,
  // backgroundColor: theme.palette.background.paper,
  color: "white",
  borderRadius: 10,
};
const google_s = {
  padding: 24,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 20,
  fontSize: 18,
};
export default function AuthModal() {
  const [open, setOpen] = React.useState(false);

  const { setAlert } = CryptoState();

  const handleOpen = () => {
    setOpen(true);
  };
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);

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
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={m_style}
      >
        <Fade in={open}>
          <div sx={paper_s}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleclose={handleClose} />}
            {value === 1 && <Signup handleclose={handleClose} />}
            <Box sx={google_s}>
              <span>OR</span>
              <GoogleButton
                sx={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
