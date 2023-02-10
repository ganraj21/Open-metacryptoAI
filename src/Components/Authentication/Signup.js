import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "styled-components";
import { Button } from "react-bootstrap";
const Signup = ({ handleclose }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { setAlert } = CryptoState();
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });

      handleclose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  return (
    <BoxStyle>
      <div className="boxdiv">
        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Enter Strong Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#EEBC1D", width: "90%", height: "45px" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </div>
    </BoxStyle>
  );
};

export default Signup;

const BoxStyle = styled.div`
  .boxdiv {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding-top: 18px;
  }
  input {
    height: 45px;
    width: 90%;
    padding-left: 20px;
    outline: none;
    border: 1px solid gray;
  }
`;
