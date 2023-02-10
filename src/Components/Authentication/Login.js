import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "styled-components";
import { Button } from "react-bootstrap";
const Login = ({ handleclose }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
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
    <BoxStyle p={3}>
      <input
        className="mb-3"
        placeholder="Enter Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-3"
        placeholder="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit} className="logbtn">
        Login
      </Button>
    </BoxStyle>
  );
};
export default Login;

const BoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
  align-items: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "segoe ui", Roboto,
    Helvetica, Arial, sans-serif;
  padding-top: 6px;

  input {
    height: 45px;
    width: 90%;
    padding-left: 20px;
    outline: none;
    border: 1px solid gray;
  }
  .logbtn {
    background-color: #eebc1d;
    width: 90%;
    height: 45px;
    &:active {
      transform: scale(0.9);
      transition: all 0.5s ease-in-out;
    }
  }
`;
