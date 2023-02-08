import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Alerts from "./Components/Alerts";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: "#232629",
  color: theme.palette.primary.main,
  minHeight: 100,
}));

function App() {
  return (
    <BrowserRouter>
      <Div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Div>
      <Alerts />
    </BrowserRouter>
  );
}

export default App;
