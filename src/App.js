import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Alerts from "./Components/Alerts";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import { styled } from "@mui/system";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: "#232629",
  color: "#fff",
  minHeight: 100,
}));

function App() {
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
      <Alerts />
    </BrowserRouter>
  );
}

export default App;
