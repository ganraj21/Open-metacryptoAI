import { MenuItem, Toolbar, Select } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import "./styles/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  console.log(currency);
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static" className="app_bar">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className="title"
              variant="h6"
            >
              MetaCrypto
            </Typography>

            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: 100, height: 40, marginLeft: 15, color: "#fff" }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
