import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";

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
  const lgbt = {
    width: "50%",
    height: "48px",
    background: "transparent",
    color: "#000",
    border: "none",
    outline: "none",
    borderBottom: "1px solid gray",
    borderRadius: 0,
  };
  return (
    <div>
      <ModalStyles>
        <Button className="authbtn" variant="contained" onClick={handleOpen}>
          Login
        </Button>

        <Modal show={open} onHide={() => setOpen(false)} className="modalest">
          <div className="papers">
            <div className="loguserbtn">
              <Button
                className={value === 0 ? "" : "activebtn"}
                style={lgbt}
                onClick={() => setValue(0)}
              >
                Login
              </Button>
              <Button
                className={value === 1 ? "" : "activebtn"}
                style={lgbt}
                onClick={() => setValue(1)}
              >
                Sign Up
              </Button>
            </div>

            <div className="appbarstyle">
              {value === 0 && <Login handleclose={handleClose} />}
              {value === 1 && <Signup handleclose={handleClose} />}
              <div
                style={{
                  padding: "0 0 20px 0",
                  marginTop: "10px",
                  gap: 9,
                  fontSize: "18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>OR</span>
                <GoogleButton
                  style={{ width: "90%", outline: "none" }}
                  onClick={signInWithGoogle}
                />
              </div>
            </div>
          </div>
        </Modal>
      </ModalStyles>
    </div>
  );
}

const ModalStyles = styled.div`
  .authbtn {
    width: 85px;
    height: 40px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eebc1d;
    &:hover {
      background-color: #607d8b7a;
    }
  }
  .papers {
    width: 400px;
    color: #000;
    border-radius: 10px;
    padding: 25px 20px;
    background: #787878bd;
    border: 1px solid #3e343499;
    @media (max-width: 600px) {
      width: 90%;
      padding: 15px 20px;
    }
  }
  .loguserbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px;
    padding: 9px;
  }
  .activebtn {
    background: red !important;
  }
  .modalest {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transperent;
    backdrop-filter: blur(11px);
  }
  .appbarstyle {
    background-color: transparent;
    color: white;
    display: flex;
    align-items: center;
  }
`;
