import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";
import styled from "styled-components";
import { Button, Container, Modal, Tab, Tabs } from "react-bootstrap";

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
      <ModalStyles>
        <Button className="authbtn" variant="contained" onClick={handleOpen}>
          Login
        </Button>

        <Modal show={open} onHide={() => setOpen(false)} className="modalest">
          <div className="papers">
            <Container>
              <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3 "
                fill
                onChange={handleChange}
              >
                <Tab
                  className="tab"
                  eventkey="Login"
                  onClick={() => setValue(0)}
                  title="Login"
                ></Tab>
                <Tab
                  className="tab"
                  eventkey="Sign Up"
                  onClick={() => setValue(1)}
                  title="Sign Up"
                ></Tab>
              </Tabs>
            </Container>

            <div className="appbarstyle"></div>
            {value === 0 && <Login handleclose={handleClose} />}
            {value === 1 && <Signup handleclose={handleClose} />}
            <div className="googleboxs">
              <span>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
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
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #EEBC1D;
    &:hover {
      background-color: #607d8b7a;
    },
  }
  .tab{
    display:flex;
  }
  .modalest {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transperent;
    backdrop-filter: blur(11px);
  }
  .papers{
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
  .googleboxs{
    padding: 24px;
  padding-top: 0;
  display:flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  font-size: 18px;
  }
  .appbarstyle{
    background-color: transparent;
    color: white;
  }
`;
