import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { CryptoState } from "./CryptoContext";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import styled from "styled-components";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { alert } = CryptoState();
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  if (alert.type === "error") {
    if (alert.message)
      toast.error(alert.message, {
        toastOptions,
      });
  } else {
    if (alert.message)
      toast.success(alert.message, {
        toastOptions,
      });
  }
  return (
    <BrowserRouter>
      <Div>
        <Header />

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/user/login" element={<Login />} />
          <Route exact path="/user/signup" element={<Signup />} />
          <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

const Div = styled.div`
  background-color: #151829;
  color: #fff;
  min-height: 100;
`;
