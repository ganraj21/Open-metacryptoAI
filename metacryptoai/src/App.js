import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Alerts from "./Components/Alerts";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";

const useStyles = makeStyles(() => ({
  App: {
    background: "#232629",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
      <Alerts />
    </BrowserRouter>
  );
}

export default App;
