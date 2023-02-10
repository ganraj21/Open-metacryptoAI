import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "styled-components";
import { Button, InputGroup } from "react-bootstrap";
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
      <Button
        variant="contained"
        style={{ backgroundColor: "#EEBC1D", width: "90%", height: "45px" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </BoxStyle>
  );
};
export default Login;

const BoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "segoe ui", Roboto,
    Helvetica, Arial, sans-serif;

  input {
    height: 45px;
    width: 90%;
  }
`;
