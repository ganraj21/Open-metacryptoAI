import CryptoContext from "./CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <CryptoContext>
    <App />
  </CryptoContext>,
  document.getElementById("root")
);
